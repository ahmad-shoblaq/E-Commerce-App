import { Public, User } from '@common/decorators';
import { Auth } from '@common/decorators/auth.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory';
import { MESSAGE } from '@common/constant';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly categoryFactoryService: CategoryFactoryService,
    ) {}

    @Post()
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @User() user: any,
    ) {
        const category = this.categoryFactoryService.createCategory(
            createCategoryDto,
            user,
        );
        const createdCategory = await this.categoryService.create(category);
        return {
            success: true,
            message: 'Category Created Successfully',
            data: createdCategory,
        };
    }

    @Get()
    async findAll(@Query() query: any) {
        const categories = await this.categoryService.findAll(query);
        return {
            success: true,
            message: 'Categories Found Successfully',
            data: categories,
        };
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const category = await this.categoryService.findOne(id);
        return {
            success: true,
            message: 'Category Found Successfully',
            data: category,
        };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @User() user: any,
    ) {
        const category = await this.categoryFactoryService.updateCategory(
            id,
            updateCategoryDto,
            user,
        );

        const updatedCategory = await this.categoryService.update(id, category);
        return {
            success: true,
            message: 'Category Updated Successfully',
            data: updatedCategory,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return {
        success: true,
        message: MESSAGE.Category.deleted,
    };
}
}
