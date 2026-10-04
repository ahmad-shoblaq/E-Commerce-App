import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '../dto/create-product.dto';
import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { DiscountType } from '@common/index';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(2)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    colors?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    sizes?: string[];

    @IsMongoId()
    @IsOptional()
    categoryId?: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    brandId?: Types.ObjectId;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    discountAmount?: number;

    @IsEnum(DiscountType)
    @IsOptional()
    discountType?: DiscountType;

    @IsNumber()
    @IsOptional()
    stock?: number;
}