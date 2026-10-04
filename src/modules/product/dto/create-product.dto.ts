import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { DiscountType, IsValidDiscount } from '@common/index';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description: string;

    @IsArray()
    @IsString({ each: true })
    colors: string[];

    @IsArray()
    @IsString({ each: true })
    sizes: string[];

    @IsMongoId()
    @IsNotEmpty()
    categoryId: Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    brandId: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsValidDiscount()
    discountAmount: number;

    @IsString()
    @IsOptional()
    @IsEnum(DiscountType)
    discountType: DiscountType;

    @IsNumber()
    @IsOptional()
    stock: number;
}
