import { Types } from 'mongoose';

export class ProductCart {
    productId: Types.ObjectId;
    quantity: number;
}

export class Cart {
    readonly _id: Types.ObjectId;
    userId: Types.ObjectId;

    products: ProductCart[];
}
