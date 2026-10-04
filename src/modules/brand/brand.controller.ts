import { Auth, Public, User } from '@common/decorators';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory/brand.factory';
import { MESSAGE } from '@common/constant';

@Controller('brand')
@Auth(['Admin'])
export class BrandController {
    constructor(
        private readonly brandService: BrandService,
        private readonly brandFactoryService: BrandFactoryService,
    ) {}

    @Post()
    async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
        const brand = this.brandFactoryService.createBrand(
            createBrandDto,
            user,
        );
        const createdBrand = await this.brandService.create(brand);
        return {
            success: true,
            message: MESSAGE.Brand.created,
            data: createdBrand,
        };
    }

    @Get()
    @Public()
    async findAll() {
        const brands = await this.brandService.findAll();
        return {
            success: true,
            message: MESSAGE.Brand.found,
            data: brands,
        };
    }

    @Get(':id')
    @Public()
    async findOne(@Param('id') id: string) {
        const brand = await this.brandService.findOne(id);
        return {
            success: true,
            message: MESSAGE.Brand.found,
            data: brand,
        };
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBrandDto: UpdateBrandDto,
    ) {
        const brand = await this.brandService.update(id, updateBrandDto);
        return {
            success: true,
            message: MESSAGE.Brand.updated,
            data: brand,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.brandService.remove(id);
        return {
            success: true,
            message: MESSAGE.Brand.deleted,
        };
    }
}