import { DiscountType } from '@common/types';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsValidToDate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsValidToDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    const { fromDate } = obj;

                    if (fromDate > value) {
                        return false;
                    }

                    return true;
                },

                defaultMessage(args: ValidationArguments) {
                    const obj = args.object as any;
                    const { fromDate, toDate } = obj;

                    if (fromDate > toDate) {
                        return 'To-Date cannot exceed From-Date';
                    }

                    return 'Invalid to date';
                },
            },
        });
    };
}

export function IsNotExpired(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsNotExpired',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return new Date(value).getTime() >= Date.now();
                },

                defaultMessage() {
                    return 'fromDate cannot be in the past';
                },
            },
        });
    };
}
