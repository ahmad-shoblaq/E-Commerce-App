import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '@modules/cart/cart.module';
import { ProductModule } from '@modules/product/product.module';
import { CouponModule } from '@modules/coupon/coupon.module';
import { UserMongoModule } from '@shared/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderRepository, orderSchema } from '@models/index';

@Module({
    imports: [
        CartModule,
        ProductModule,
        CouponModule,
        MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
        UserMongoModule,
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
})
export class OrderModule {}