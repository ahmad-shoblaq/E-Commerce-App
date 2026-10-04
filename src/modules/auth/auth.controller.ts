import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { LoginDTO } from './dto/login.dto';
import { ConfirmEmailDTO } from './dto/confirm-email.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authFactoryService: AuthFactoryService,
    ) {}

    @Post('/register')
    async register(@Body() registerDTO: RegisterDTO) {
        const customer =
            await this.authFactoryService.createCustomer(registerDTO);
        const createdCustomer = await this.authService.register(customer);
        return {
            message: 'Customer registered successfully',
            success: true,
            data: createdCustomer,
        };
    }

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO) {
        const token = await this.authService.login(loginDTO);
        return {
            message: 'login successfully',
            success: true,
            data: { token },
        };
    }

    @Post('/confirm-email')
    async confirmEmail(@Body() dto: ConfirmEmailDTO) {
        await this.authService.confirmEmail(dto);
        return { message: 'Email confirmed successfully', success: true };
    }

    @Post('/resend-otp')
    async resendOtp(@Body('email') email: string) {
        await this.authService.resendOtp(email);
        return { message: 'A new code has been sent', success: true };
    }
}
