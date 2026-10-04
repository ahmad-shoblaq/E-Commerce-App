import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Admin,
    AdminRepository,
    Customer,
    CustomerRepository,
    Seller,
    SellerRepository,
    User,
    UserRepository,
    adminSchema,
    customerSchema,
    sellerSchema,
    userSchema,
} from '@models/index';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: userSchema,
                discriminators: [
                    { name: Customer.name, schema: customerSchema },
                    { name: Seller.name, schema: sellerSchema },
                    { name: Admin.name, schema: adminSchema },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [
        SellerRepository,
        AdminRepository,
        CustomerRepository,
        UserRepository,
    ],
    exports: [
        SellerRepository,
        AdminRepository,
        CustomerRepository,
        UserRepository,
    ],
})
export class UserMongoModule {}
