import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserMongoModule, JwtModule],
    controllers: [CustomerController],
    providers: [CustomerService, JwtService],
})
export class CustomerModule {}
