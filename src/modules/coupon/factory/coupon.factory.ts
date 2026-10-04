import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { Coupon } from '../entities/coupon.entity';

@Injectable()
export class CouponFactoryService {
    createCoupon(createCouponDto: CreateCouponDto, user: any) {
        const coupon = new Coupon();

        coupon.code = createCouponDto.code;
        coupon.discountAmount = createCouponDto.discountAmount;
        coupon.discountType = createCouponDto.discountType;
        coupon.assignedTo = (createCouponDto.assignedTo ?? []).map((id) => ({
            customerId: id,
            count: 0,
        }));

        coupon.usedBy = [];
        coupon.createdBy = user._id;
        coupon.updatedBy = user._id;
        coupon.fromDate = createCouponDto.fromDate;
        coupon.toDate = createCouponDto.toDate;

        coupon.active = createCouponDto.active ?? true;
        return coupon;
    }
}