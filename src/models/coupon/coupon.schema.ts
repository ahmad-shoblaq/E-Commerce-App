import { DiscountType } from '@common/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserCoupon {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    customerId: Types.ObjectId;

    @Prop({ type: Number })
    count: number;
}
@Schema({
    timestamps: true,
    // discriminatorKey: 'role',
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
})
export class Coupon {
    readonly _id: Types.ObjectId;
    @Prop({ type: String, required: true })
    code: string;

    @Prop({ type: Number, required: true })
    discountAmount: number;

    @Prop({
        type: String,
        enum: DiscountType,
        default: DiscountType.fixed_amount,
        required: true,
    })
    discountType: DiscountType;

    @Prop({ type: Date, required: true })
    fromDate: Date;

    @Prop({ type: Date, required: true })
    toDate: Date;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    updatedBy: Types.ObjectId;

    @Prop({ type: Boolean, default: true })
    active: boolean;

    @Prop({ type: [UserCoupon] })
    usedBy: UserCoupon[];

    @Prop({ type: [UserCoupon] })
    assignedTo: UserCoupon[];
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
