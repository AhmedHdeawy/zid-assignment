import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Length, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueNameValidator } from './unique_name.validator';

export class UpdateProductDto {

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
