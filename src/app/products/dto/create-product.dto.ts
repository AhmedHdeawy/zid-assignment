import { Length, IsNotEmpty, IsString, Validate, Min, Max, IsNumber, IsArray, ArrayMinSize } from 'class-validator';
import { UniqueNameValidator } from './unique_name.validator';
import { IsCategoriesExistsValidator } from './categories_exists.validator';


export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(2, 200)
    @Validate(UniqueNameValidator)
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(1000000)
    readonly price: number;


    @IsNotEmpty()
    @IsString()
    @Length(2)
    readonly description: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Validate(IsCategoriesExistsValidator)
    readonly categories: string;
}
