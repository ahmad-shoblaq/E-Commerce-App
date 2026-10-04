import { ProductRepository } from '@models/index';
import { BrandService } from '@modules/brand/brand.service';
import { CategoryService } from '@modules/category/category.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { MESSAGE } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryService: CategoryService,
        private readonly brandService: BrandService,
    ) {}

    async create(product: Product, user: any) {
        await this.categoryService.findOne(product.categoryId);
        await this.brandService.findOne(product.brandId);
        const productExist = await this.productRepository.getOne({
            slug: product.slug,
            $or: [{ createdBy: user._id }, { updatedBy: user._id }],
        }); // create or update
        if (productExist) {
            return await this.update(productExist._id, product, user);
        }
        return await this.productRepository.create(product);
    }

    async findAll() {
        return this.productRepository.getAll({});
    }

    async findOne(id: string | Types.ObjectId) {
        const product = await this.productRepository.getOne({ _id: id });
        if (!product) throw new NotFoundException(MESSAGE.Product.notFound);
        return product;
    }

    async update(
        id: string | Types.ObjectId,
        product: Partial<Product>,
        user: any,
    ) {
        const productExist = await this.findOne(id);
        if (!productExist)
            throw new NotFoundException(MESSAGE.Product.notFound);

        if (product.stock !== undefined) {
            product.stock += productExist.stock;
        }

        if (product.colors) {
            const colors = this.addToSet(product.colors, productExist.colors);
            product.colors = Array.from(colors);
        }

        if (product.sizes) {
            const sizes = this.addToSet(product.sizes, productExist.sizes);
            product.sizes = Array.from(sizes);
        }

        product.updatedBy = user._id;

        return await this.productRepository.updateOne({ _id: id }, product, {
            new: true,
        });
    }

    async remove(id: string) {
        const product = await this.productRepository.deleteOne({ _id: id });
        if (!product) throw new NotFoundException(MESSAGE.Product.notFound);
        return true;
    }

    addToSet(newData: string[], oldData: string[]) {
        const items = new Set<string>(oldData);
        for (const item of newData) {
            items.add(item);
        }
        return items;
    }
}
