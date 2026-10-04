import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';

@Injectable()
export class BrandFactoryService {
    createBrand(createBrandDto: CreateBrandDto, user: any) {
        const brand = new Brand();
        brand.name = createBrandDto.name;
        brand.slug = slugify(createBrandDto.name, {
            lower: true,
            trim: true,
            strict: true,
        });
        brand.createdBy = user._id;
        brand.updatedBy = user._id;
        brand.logo = createBrandDto.logo;
        return brand;
    }
}
