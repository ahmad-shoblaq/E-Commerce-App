import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';
import { ProductFactoryService } from './factory/product.factory';
import { Product, ProductRepository, productSchema } from '@models/index';
import { BrandModule } from '@modules/brand/brand.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@modules/category/category.module';

@Module({
    imports: [
        UserMongoModule,
        MongooseModule.forFeature([
            { name: Product.name, schema: productSchema },
        ]),
        BrandModule,
        CategoryModule,
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductFactoryService, ProductRepository],
    exports: [ProductService, ProductFactoryService, ProductRepository],
})
export class ProductModule {}
