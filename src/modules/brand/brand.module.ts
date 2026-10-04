import { BrandRepository, brandSchema } from '@models/index';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/index';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { BrandFactoryService } from './factory/brand.factory';

@Module({
    imports: [
        UserMongoModule,
        MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
    ],
    controllers: [BrandController],
    providers: [BrandService, BrandFactoryService, BrandRepository],
    exports: [BrandService, BrandFactoryService, BrandRepository],
})
export class BrandModule {}
