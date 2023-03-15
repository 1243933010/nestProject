import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository,Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    let res = await this.user.findOne({where:{username:createUserDto.username}});
    if(res){
      return {code:400,message:'当前账户已被注册'}
    }
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;

    this.user.save(data);
    return {message:'添加成功'};
  }

  async findAll(username:string):Promise<any> {
    let res = await this.user.findOne({where:{username}});
    return res;
  }

  async getUserInfo(name:string){
    let res = await this.user.findOne({where:{username:name}})
    if(!res){
      return {message:'无数据'}
    }
    let {id,password,...data} = res;
    return data;
  }


  
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
