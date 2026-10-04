import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Coupon } from './coupon.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable() // service - repos - factories - helpers
export class CouponRepository extends AbstractRepository<Coupon> {
    constructor(
        @InjectModel(Coupon.name)
        private readonly couponModel: Model<Coupon>,
    ) {
        super(couponModel);
    }
}
