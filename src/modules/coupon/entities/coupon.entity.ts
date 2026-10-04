import { DiscountType } from '@common/types';
import { UserCoupon } from '@models/index';
import { Types } from 'mongoose';

export class Coupon {
    readonly _id: Types.ObjectId;
    code: string;
    discountAmount: number;
    discountType: DiscountType;
    fromDate: Date;
    toDate: Date;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    active: boolean;
    usedBy: UserCoupon[];
    assignedTo: UserCoupon[];
}
