import { Length, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueNameValidator } from './unique_name.validator';
import { CategoriesService } from '../categories.service';


export class CreateCategoryDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(2, 200)
    // @Validate(UniqueNameValidator)
    readonly name: string;


    @IsNotEmpty()
    @IsString()
    @Length(2)
    readonly description: string;
}
