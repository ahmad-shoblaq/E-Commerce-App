import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { DiscountType } from '@common/index';

@Schema({
    timestamps: true,
    discriminatorKey: 'role',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Product {
    readonly _id: Types.ObjectId;
    // Strings
    @Prop({ type: String, required: true, trim: true })
    name: string;
    @Prop({ type: String, required: true, trim: true })
    slug: string;
    @Prop({ type: String, required: true, trim: true })
    description: string;
    @Prop({
        type: [String],
        trim: true,
        set: (value: string[]) => (value ? [...new Set(value)] : value),
    })
    colors: string[];
    @Prop({
        type: [String],
        trim: true,
        set: (value: string[]) => (value ? [...new Set(value)] : value),
    })
    sizes: string[];

    // Ids
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
    categoryId: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
    brandId: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    updatedBy: Types.ObjectId;

    // Numbers
    @Prop({ type: Number, required: true, min: 1 })
    price: number;
    @Prop({ type: Number, required: true, min: 0, default: 0 })
    discountAmount: number;
    @Prop({ type: String, default: DiscountType.fixed_amount })
    discountType: DiscountType;

    @Virtual({
        get: function (this: Product) {
            return this.discountType == DiscountType.fixed_amount
                ? this.price - this.discountAmount
                : this.price - (this.price * this.discountAmount) / 100;
        },
    })
    finalPrice: number;
    @Prop({ type: Number, min: 0, default: 1 })
    stock: number;
    @Prop({ type: Number, min: 0 })
    sold: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
