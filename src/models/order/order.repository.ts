import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
    constructor(@InjectModel(Order.name) orderModel: Model<Order>) {
        super(orderModel);
    }
}
