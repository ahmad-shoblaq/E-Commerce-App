import { MongooseModule } from '@nestjs/mongoose';
import { CartRepository, cartSchema } from '@models/index';
import { Module } from '@nestjs/common';
import { ProductModule } from '@modules/product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserMongoModule } from '@shared/modules';

@Module({
    imports: [
        UserMongoModule,
        ProductModule,
        MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
    ],
    controllers: [CartController],
    providers: [CartService, CartRepository],
    exports: [CartService, CartRepository],
})
export class CartModule {}
