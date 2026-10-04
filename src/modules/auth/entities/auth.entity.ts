import { Types } from 'mongoose';
export class Customer {
    readonly _id: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    otp: string;
    otpExpiry: Date;
    isVerified: boolean;
}
