import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDto {
    @IsMongoId()
    productId: Types.ObjectId;

    @IsNumber()
    @IsOptional()
    quantity: number;
}
