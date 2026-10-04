import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable() // service - repos - factories - helpers
export class CartRepository extends AbstractRepository<Cart> {
    constructor(
        @InjectModel(Cart.name)
        private readonly cartModel: Model<Cart>,
    ) {
        super(cartModel);
    }
}
