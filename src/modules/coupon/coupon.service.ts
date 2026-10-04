import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponRepository } from '@models/index';
import { MESSAGE } from '@common/constant';

@Injectable()
export class CouponService {
    constructor(private readonly couponRepository: CouponRepository) {}
    async create(coupon: Coupon) {
        const couponExist = await this.couponRepository.getOne({
            code: coupon.code,
            active: true,
        });
        if (couponExist)
            throw new ConflictException(MESSAGE.Coupon.alreadyExist);
        return await this.couponRepository.create(coupon);
    }

    findAll() {
        return this.couponRepository.getAll({});
    }

    async findOne(id: string) {
        const coupon = await this.couponRepository.getOne({ _id: id });
        if (!coupon) throw new NotFoundException(MESSAGE.Coupon.notFound);
        return coupon;
    }

    async update(id: string, updateCouponDto: UpdateCouponDto) {
        await this.findOne(id);
        return this.couponRepository.updateOne({ _id: id }, updateCouponDto, {
            new: true,
        });
    }

    async remove(id: string) {
        const coupon = await this.couponRepository.deleteOne({ _id: id });
        if (!coupon) throw new NotFoundException(MESSAGE.Coupon.notFound);
        return true;
    }
}