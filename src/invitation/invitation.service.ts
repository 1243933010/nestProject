import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import {Invitation} from './entities/invitation.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { FindAll } from './interface';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly invitation:Repository<Invitation>,
  ){}
  async create(createInvitationDto: CreateInvitationDto) {
    let data = new Invitation();
    data.userId = createInvitationDto.userId;
    data.title = createInvitationDto.title;
    data.content = createInvitationDto.content;
    
    let res = await this.invitation.save(data);
    console.log(res,'==')
    return {message:'帖子保存成功'};
  }

  async findAll(param:FindAll) {
    console.log(param,'--')
    let {userId,startTime,endTime,title} = param;
    title?title=title:title='';
    let time1;
    let time2; 
    if(startTime){time1=new Date(startTime)}
    if(endTime){time2= new Date(endTime)}
    
    let queryObject = {where:{userId:userId,title:Like(`%${title}%`),createTime:Between(time1,time2)}}
    if(!startTime||!endTime){
      delete queryObject.where.createTime;
    }
    if(!userId){
      delete queryObject.where.userId;
    }
    let data = await this.invitation.find(queryObject)
    console.log(data)
    return {};
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
