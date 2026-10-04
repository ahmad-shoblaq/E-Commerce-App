import {
    IsValidDiscount,
    IsValidToDate,
    IsNotExpired,
} from '@common/decorators';
import { DiscountType } from '@common/types';
import { Transform } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 5)
    code: string;

    @IsValidDiscount()
    discountAmount: number;

    @IsString()
    @IsEnum(DiscountType)
    discountType: DiscountType;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotExpired()
    fromDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsValidToDate()
    toDate: Date;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    assignedTo: Types.ObjectId[];
}