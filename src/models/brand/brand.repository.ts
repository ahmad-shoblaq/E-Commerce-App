import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Brand } from './brand.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandRepository extends AbstractRepository<Brand> {
    constructor(
        @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
    ) {
        super(brandModel);
    }
}
