import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    discriminatorKey: 'role',
})
export class Seller {
    readonly _id: Types.ObjectId;
    userName: string;
    email: string;
    password: string;

    @Prop({ type: String, required: true })
    shopName: string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);
