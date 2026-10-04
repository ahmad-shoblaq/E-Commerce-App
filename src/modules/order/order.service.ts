import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '@modules/cart/cart.service';
import {
    CouponRepository,
    OrderRepository,
    ProductRepository,
} from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
    constructor(
        private readonly cartService: CartService,
        private readonly productRepository: ProductRepository,
        private readonly orderRepository: OrderRepository,
        private readonly couponRepository: CouponRepository,
    ) {}

    async create(createOrderDto: CreateOrderDto, user: any) {
        const cart = await this.cartService.findOne(user);
        if (cart.products.length == 0)
            throw new NotFoundException('Cart Is Empty');
        const failProducts: { productId: Types.ObjectId; reason: string }[] =
            [];
        const successProducts: {
            productId: Types.ObjectId;
            quantity: number;
            price: number;
            discount: number;
            totalPrice: number;
        }[] = [];
        for (const product of cart.products) {
            const productExist = await this.productRepository.getOne({
                _id: product.productId,
            });
            if (!productExist) {
                failProducts.push({
                    productId: product.productId,
                    reason: 'Product not found',
                });
                continue;
            }
            if (productExist.stock < product.quantity) {
                failProducts.push({
                    productId: product.productId,
                    reason: 'Product stock not enough',
                });
                continue;
            }
            successProducts.push({
                productId: product.productId,
                quantity: product.quantity,
                price: productExist.finalPrice,
                discount: productExist.discountAmount,
                totalPrice: productExist.finalPrice * product.quantity,
            });
        }
        if (failProducts.length > 0) {
            throw new BadRequestException({
                message: 'Some products could not be ordered',
                failProducts,
            });
        }

        const subTotal = successProducts.reduce(
            (acc, cur) => acc + cur.totalPrice,
            0,
        );

        // validate the coupon against the DB, never trust the client's numbers
        let couponDetails = undefined;
        if (createOrderDto.couponDetails?.code) {
            const coupon = await this.couponRepository.getOne({
                code: createOrderDto.couponDetails.code,
                active: true,
                fromDate: { $lte: new Date() },
                toDate: { $gte: new Date() },
            });
            if (!coupon)
                throw new BadRequestException('Invalid or expired coupon');

            const discountAmount =
                coupon.discountType === 'percentage'
                    ? (subTotal * coupon.discountAmount) / 100
                    : coupon.discountAmount;

            couponDetails = {
                couponId: coupon._id,
                code: coupon.code,
                discountAmount,
            };
        }

        const totalAmount = subTotal - (couponDetails?.discountAmount ?? 0);

        // create order
        const order = await this.orderRepository.create({
            userId: user._id,
            products: successProducts,
            address: createOrderDto.address,
            paymentMethod: createOrderDto.paymentMethod,
            couponDetails,
            totalAmount,
        });

        // decrement stock / increment sold for each product
        for (const item of successProducts) {
            await this.productRepository.updateOne(
                { _id: item.productId },
                { $inc: { stock: -item.quantity, sold: item.quantity } },
            );
        }

        await this.cartService.clearCart(user);
        return order;
    }

async findAll(user: any) {
    const filter = user.role === 'Admin' ? {} : { userId: user._id };
    return this.orderRepository.getAll(filter, {}, { sort: { createdAt: -1 } });
}

async findOne(id: string, user: any) {
    const filter =
        user.role === 'Admin' ? { _id: id } : { _id: id, userId: user._id };
    const order = await this.orderRepository.getOne(filter);
    if (!order) throw new NotFoundException('Order Not Found');
    return order;
}
}
