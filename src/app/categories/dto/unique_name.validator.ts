import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, useContainer } from 'class-validator';
import { CategoriesService } from '../categories.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueNameValidator implements ValidatorConstraintInterface {
    constructor(private readonly categoriesService: CategoriesService) { }
    
    async validate(name: string) {
        const category = await this.categoriesService.getCategoryByName(name);
        return !category;
    }

    defaultMessage(args: ValidationArguments) {
        return `Category with name ${args.value} already exists`;
    }
}
