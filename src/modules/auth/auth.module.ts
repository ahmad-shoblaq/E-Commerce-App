import { Module } from '@nestjs/common';
import { UserMongoModule } from '@shared/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserMongoModule, JwtModule],
    controllers: [AuthController],
    providers: [AuthService, AuthFactoryService],
})
export class AuthModule {}
