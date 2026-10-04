import {
    Controller,
    Get,
    Post,
    Body,
    Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('order')
@Auth(['Customer', 'Admin'])
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto, @User() user: any) {
        const order = await this.orderService.create(createOrderDto, user);
        return {
            success: true,
            message: MESSAGE.Order.created,
            data: order,
        };
    }

    /** Customers see their own orders, admins see all of them */
    @Get()
    async findAll(@User() user: any) {
        const orders = await this.orderService.findAll(user);
        return {
            success: true,
            message: MESSAGE.Order.found,
            data: orders,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @User() user: any) {
        const order = await this.orderService.findOne(id, user);
        return {
            success: true,
            message: MESSAGE.Order.found,
            data: order,
        };
    }
}