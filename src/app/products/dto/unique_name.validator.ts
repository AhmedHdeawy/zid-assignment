import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, useContainer } from 'class-validator';
import { ProductsService } from '../products.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueNameValidator implements ValidatorConstraintInterface {
    constructor(private readonly productsService: ProductsService) { }
    
    async validate(name: string) {
        const product = await this.productsService.getProductByName(name);
        return !product;
    }

    defaultMessage(args: ValidationArguments) {
        return `Product with name ${args.value} already exists`;
    }
}
