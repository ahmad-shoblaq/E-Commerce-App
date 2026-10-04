import { DiscountType } from '@common/index';
import { Types } from 'mongoose';
// import { DiscountType } from "src/common/enum";

export class Product {
    name: string;
    slug: string;
    description: string;
    colors: string[];
    sizes: string[];

    categoryId: Types.ObjectId;
    brandId: Types.ObjectId;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;

    price: number;
    discountAmount: number;
    discountType: DiscountType;

    finalPrice: number;
    stock: number;
    sold: number;
}
