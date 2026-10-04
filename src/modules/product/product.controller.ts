import {
    Auth,
    MESSAGE,
    Public,
    TransformInterceptor,
    User,
} from '@common/index';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactoryService } from './factory/product.factory';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
@UseInterceptors(new TransformInterceptor<Product>())
@Auth(['Admin', 'Seller'])
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productFactoryService: ProductFactoryService,
    ) {}

    @Post()
    async create(
        @Body() createProductDto: CreateProductDto,
        @User() user: any,
    ) {
        const product = this.productFactoryService.createProduct(
            createProductDto,
            user,
        );
        const createdProduct = await this.productService.create(product, user);
        return {
            success: true,
            message: MESSAGE.Product.created,
            data: createdProduct,
        };
    }

    @Get()
    @Public()
    async findAll() {
        const products = await this.productService.findAll();
        return {
            success: true,
            message: MESSAGE.Product.found,
            data: products,
        };
    }

    @Get(':id')
    @Public()
    async findOne(@Param('id') id: string) {
        const product = await this.productService.findOne(id);
        return {
            success: true,
            message: MESSAGE.Product.found,
            data: product,
        };
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
        @User() user: any,
    ) {
        const product = await this.productService.update(id, dto, user);
        return {
            success: true,
            message: MESSAGE.Product.updated,
            data: product,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.productService.remove(id);
        return { success: true, message: MESSAGE.Product.deleted };
    }
}
