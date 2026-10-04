import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory/coupon.factory';
import { CouponRepository, CouponSchema } from '@models/index';
import { UserMongoModule } from '@shared/modules';

@Module({
    imports: [
        UserMongoModule,
        MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]),
    ],
    controllers: [CouponController],
    providers: [CouponService, CouponFactoryService, CouponRepository],
    exports: [CouponService, CouponRepository, CouponFactoryService],
})
export class CouponModule {}
