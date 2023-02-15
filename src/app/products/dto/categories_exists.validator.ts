import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoriesService } from 'src/app/categories/categories.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoriesExistsValidator implements ValidatorConstraintInterface {
    
    private failedIds: number[];
    
    constructor(private readonly categoriesService: CategoriesService) { }
    
    async validate(categories: number[]) {

        this.failedIds = [];
        // Get All Categories
        const dbCategories = await this.categoriesService.findAll();
        
        // Pluck Ids
        const idArray = dbCategories.map(function (el) { return el.id; });
        
        let exist = true;
        for (let index = 0; index < categories.length; index++) {
            if ( !idArray.includes(categories[index] ) ) {
                this.failedIds.push(categories[index]);
                exist = false;
            }
        }

        return exist;
    }

    defaultMessage(args: ValidationArguments) {

        return `Categories ${this.failedIds.toString()} are not exists in our DB`;
    }
}
