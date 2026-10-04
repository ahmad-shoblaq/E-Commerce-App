import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { MESSAGE } from '@common/constant';
import { Auth, User } from '@common/decorators';

@Controller('cart')
@Auth(['Customer', 'Admin'])
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    async addToCart(@Body() createCartDto: AddToCartDto, @User() user: any) {
        const cart = await this.cartService.addToCart(createCartDto, user);
        return {
            success: true,
            message: MESSAGE.Cart.updated,
            data: cart,
        };
    }

    @Put('/remove/:productId')
    async removeFromCart(
        @Param('productId') productId: string,
        @User() user: any,
    ) {
        await this.cartService.removeFromCart(productId, user);
        return {
            success: true,
            message: MESSAGE.Cart.updated,
        };
    }

    @Get()
    async getCart(@User() user: any) {
        const cart = await this.cartService.findOne(user);
        return { success: true, data: cart };
    }
}
