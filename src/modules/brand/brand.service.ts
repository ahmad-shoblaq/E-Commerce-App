import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from '@models/index';
import { MESSAGE } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) {}
    async create(brand: Brand) {
        const brandExist = await this.brandRepository.getOne({
            slug: brand.slug,
        });
        if (brandExist) throw new ConflictException(MESSAGE.Brand.alreadyExist);
        return this.brandRepository.create(brand);
    }

    findAll() {
        return this.brandRepository.getAll({});
    }

    async findOne(id: string | Types.ObjectId) {
        const brandExist = await this.brandRepository.getOne({
            _id: id,
        });
        if (!brandExist) throw new NotFoundException(MESSAGE.Brand.notFound);
        return brandExist;
    }

    async update(id: string | Types.ObjectId, updateBrandDto: UpdateBrandDto) {
        await this.findOne(id);
        return this.brandRepository.updateOne({ _id: id }, updateBrandDto, {
            new: true,
        });
    }

    async remove(id: string | Types.ObjectId) {
        const brand = await this.brandRepository.deleteOne({ _id: id });
        if (!brand) throw new NotFoundException(MESSAGE.Brand.notFound);
        return true;
    }
}