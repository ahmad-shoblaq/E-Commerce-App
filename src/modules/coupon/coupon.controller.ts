import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponFactoryService } from './factory/coupon.factory';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('coupon')
@Auth(['Admin', 'Seller'])
export class CouponController {
    constructor(
        private readonly couponService: CouponService,
        private readonly couponFactoryService: CouponFactoryService,
    ) {}

    @Post()
    async create(@Body() createCouponDto: CreateCouponDto, @User() user: any) {
        const coupon = this.couponFactoryService.createCoupon(
            createCouponDto,
            user,
        );
        const createdCoupon = await this.couponService.create(coupon);
        return {
            success: true,
            message: MESSAGE.Coupon.created,
            data: createdCoupon,
        };
    }

    @Get()
    async findAll() {
        const coupons = await this.couponService.findAll();
        return {
            success: true,
            message: MESSAGE.Coupon.found,
            data: coupons,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const coupon = await this.couponService.findOne(id);
        return {
            success: true,
            message: MESSAGE.Coupon.found,
            data: coupon,
        };
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCouponDto: UpdateCouponDto,
    ) {
        const coupon = await this.couponService.update(id, updateCouponDto);
        return {
            success: true,
            message: MESSAGE.Coupon.updated,
            data: coupon,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.couponService.remove(id);
        return {
            success: true,
            message: MESSAGE.Coupon.deleted,
        };
    }
}