import { Length, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueNameValidator } from './unique_name.validator';
import { ProductsService } from '../products.service';


export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(2, 200)
    @Validate(UniqueNameValidator)
    readonly name: string;


    @IsNotEmpty()
    @IsString()
    @Length(2)
    readonly description: string;
}
