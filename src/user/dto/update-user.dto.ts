import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNotEmpty,IsString,IsEmpty} from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty({message:'名称不能为空'})
    @IsString()
    username :string

    role:string

    avatar:string
}
