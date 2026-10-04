import { Customer, CustomerRepository, UserRepository } from '@models/index';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sendMail } from '@common/helpers';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfirmEmailDTO } from './dto/confirm-email.dto';
import { generateOtp } from '../../common/helpers/otp.helper';
@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly customerRepository: CustomerRepository,
        private readonly userRepository: UserRepository,

        private readonly jwtService: JwtService,
    ) {}
    async register(customer: Customer) {
        const customerExist = await this.customerRepository.getOne({
            email: customer.email,
        });
        if (customerExist) {
            throw new ConflictException('Customer already exists');
        }

        const plainOtp = generateOtp();
        customer.otp = await bcrypt.hash(plainOtp, 10);

        const createdCustomer = await this.customerRepository.create(customer);

        // Send Email (plain code, not the hash)
        sendMail({
            from: this.configService.get('EMAIL_USER'),
            to: customer.email,
            subject: 'Confirm Email',
            html: `<h1>Your OTP is ${plainOtp}</h1>`,
        });

        const { password, otp, otpExpiry, ...customerObj } = JSON.parse(
            JSON.stringify(createdCustomer),
        );

        return customerObj as Customer;
    }

    async login(loginDTO: LoginDTO) {
        const customerExist = await this.userRepository.getOne({
            email: loginDTO.email,
        });
        const match = await bcrypt.compare(
            loginDTO.password,
            customerExist?.password || ' ',
        );
        if (!customerExist)
            throw new UnauthorizedException('invalid credentials');
        if (!match) throw new UnauthorizedException('invalid credentials');
        // generate token
        const token = this.jwtService.sign(
            {
                _id: customerExist._id,
                role: 'Customer',
                email: customerExist.email,
            },
            {
                secret: this.configService.get('access').jwt_secret,
                expiresIn: '1d',
            },
        );
        return token;
    }

    async confirmEmail(dto: ConfirmEmailDTO) {
        const user = await this.userRepository.getOne({ email: dto.email });
        if (!user) throw new BadRequestException('Invalid email or code');
        if (user.isVerified)
            throw new BadRequestException('Email already confirmed');
        if (
            !user.otp ||
            !user.otpExpiry ||
            user.otpExpiry.getTime() < Date.now()
        )
            throw new BadRequestException(
                'Code expired, please request a new one',
            );

        if (dto.otp !== user.otp) throw new BadRequestException('Invalid code');

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        return true;
    }

    async resendOtp(email: string) {
        const user = await this.userRepository.getOne({ email });
        if (!user) throw new BadRequestException('User not found');
        if (user.isVerified) throw new BadRequestException('Already confirmed');

        user.otp = generateOtp();
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        sendMail({
            to: user.email,
            subject: 'Confirm your email',
            html: `<h2>Your code is ${user.otp}</h2>`,
        });
        return true;
    }
}
