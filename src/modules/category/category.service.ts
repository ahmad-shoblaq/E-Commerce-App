import { Category, CategoryRepository } from '@models/index';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    async create(category: Category) {
        const categoryExist = await this.categoryRepository.getOne({
            slug: category.slug,
        });
        if (categoryExist)
            throw new ConflictException('category already exist');
        return await this.categoryRepository.create(category);
    }

    findAll(query: any) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        return this.categoryRepository.getAll(
            {},
            {},
            { limit, skip: (page - 1) * limit },
        );
    }

    async findOne(id: string | Types.ObjectId) {
        const category = await this.categoryRepository.getOne(
            { _id: id },
            {},
            { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
        );
        if (!category) throw new NotFoundException('category not found');
        return category;
    }

    async update(id: string | Types.ObjectId, category: Category) {
        const categoryExist = await this.categoryRepository.getOne({
            slug: category.slug,
            _id: { $ne: id },
        });
        if (categoryExist)
            throw new ConflictException('Category Already Exists');
        return await this.categoryRepository.updateOne(
            { _id: id },
            { $set: category },
            { new: true },
        );
    }

    remove(id: string | Types.ObjectId) {
        return this.categoryRepository.deleteOne({ _id: id });
    }
}
