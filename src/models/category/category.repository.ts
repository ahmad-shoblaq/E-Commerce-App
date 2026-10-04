import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable() // service - repos - factories - helpers
export class CategoryRepository extends AbstractRepository<Category> {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
    ) {
        super(categoryModel);
    }
}
