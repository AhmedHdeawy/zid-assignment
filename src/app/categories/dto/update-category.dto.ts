import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Length, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueNameValidator } from './unique_name.validator';

export class UpdateCategoryDto {

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
