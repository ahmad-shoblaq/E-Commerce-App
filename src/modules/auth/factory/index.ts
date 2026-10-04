import { generateOtp } from '@common/helpers';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from '../dto/register.dto';
import { Customer } from '../entities/auth.entity';

export class AuthFactoryService {
    async createCustomer(registerDTO: RegisterDTO) {
        const customer = new Customer();
        customer.userName = registerDTO.userName;
        customer.email = registerDTO.email;
        customer.password = await bcrypt.hash(registerDTO.password, 10);
        customer.otp = generateOtp();
        customer.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        customer.dob = registerDTO.dob;
        customer.isVerified = false;
        return customer;
    }
}