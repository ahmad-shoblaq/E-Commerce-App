import { PaymentMethod } from '@common/types';
import {
    IsString,
    IsMongoId,
    IsOptional,
    IsEnum,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CouponDetails {
    @IsMongoId()
    couponId: Types.ObjectId;
    @IsNumber()
    discountAmount: number;
    @IsString()
    code: string;
}
export class AddressDto {
    @IsString()
    street: string;
    @IsString()
    city: string;
    @IsString()
    country: string;
    @IsString()
    code: string;
    @IsString()
    phoneNumber: string;
}

export class CreateOrderDto {
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod: PaymentMethod;

    @ValidateNested()
    @Type(() => CouponDetails)
    @IsOptional()
    couponDetails: CouponDetails;
}
