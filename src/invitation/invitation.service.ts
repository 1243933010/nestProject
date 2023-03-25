import { Injectable, Request } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity'
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { FindAll } from './interface';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly invitation: Repository<Invitation>,
    @InjectRepository(User) private readonly user: Repository<User>,

  ) { }
  async create(createInvitationDto: CreateInvitationDto) {
    let data = new Invitation();
    data.userId = createInvitationDto.userId;
    data.title = createInvitationDto.title;
    data.content = createInvitationDto.content;

    let res = await this.invitation.save(data);
    console.log(res, '==')
    return { message: '帖子保存成功' };
  }

  async findAll(param: FindAll) {
    console.log(param, '--')
    let { userId, startTime, endTime, title } = param;
    title ? title = title : title = '';
    let time1;
    let time2;
    if (startTime) { time1 = new Date(startTime) }
    if (endTime) { time2 = new Date(endTime) }

    let queryObject = { where: { userId: userId, title: Like(`%${title}%`), createTime: Between(time1, time2) } }
    if (!startTime || !endTime) {
      delete queryObject.where.createTime;
    }
    if (!userId) {
      delete queryObject.where.userId;
    }
    let data = await this.invitation.find(queryObject)
    console.log(data)
    return data;
  }

  async findOne(id: number) {
    try {
      let res = await this.invitation.findOne({ where: { id } })
      if (res) {
        return res;
      }
      return { code: 400, message: '未找到数据' }
    } catch (error) {
      return { messge: error.message, code: 400 }
    }
  }

  async update(id: number, updateInvitationDto: UpdateInvitationDto,req:{user:{id:number}}) {
    try {
      let res = await this.invitation.findOne({ where: { id } })
      let result = await this.user.findOne({ where: { id: req.user.id } })  
      if (result.id == res.userId) {
        let data = await this.invitation.update(id,updateInvitationDto)
        if (data) {
          return { message: '修改成功' }
        }
      } else {
        return { code: 400, message: '只能由创建人删除' };
      }
    } catch (error) {
      console.log(error)
      return {message:error.message,code:400}
    }
    
  }

  async remove(id: number, user: { id: number }) {
    try {
      let res = await this.invitation.findOne({ where: { id } })
      let result = await this.user.findOne({ where: { id: user.id } })
      if (result.id == res.userId) {
        let data = await this.invitation.delete({ id })
        if (data) {
          return { message: '删除成功' }
        }
      } else {
        return { code: 400, message: '只能由创建人删除' };
      }
    } catch (error) {
      console.log(error)
      return { message: error.message, code: 400 }
    }

  }
}
