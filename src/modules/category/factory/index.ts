import { Category } from '../entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryFactoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    createCategory(createCategory: CreateCategoryDto, user: any) {
        const category = new Category();
        category.name = createCategory.name;
        category.slug = slugify(createCategory.name, {
            lower: true,
            trim: true,
            strict: true,
        });
        category.createdBy = user._id;
        category.updatedBy = user._id;
        category.logo = createCategory.logo;
        return category;
    }

    async updateCategory(
        id: string,
        updateCategory: UpdateCategoryDto,
        user: any,
    ) {
        const oldCategory = (await this.categoryRepository.getOne({
            _id: id,
        })) as Category;
        if (!oldCategory) {
            throw new NotFoundException('Category not found');
        }
        const category = new Category();
        const newName = updateCategory.name || oldCategory.name;
        category.name = newName;
        category.slug = slugify(newName, {
            lower: true,
            trim: true,
            strict: true,
        });
        category.logo = updateCategory.logo || oldCategory.logo;
        category.updatedBy = user._id;
        return category;
    }
}
