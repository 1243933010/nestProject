import { Injectable, Request } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity'
import { User } from 'src/user/entities/user.entity';
import { Reply } from './entities/reply.tntity';
import { ReplyParent } from './entities/replyParent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository,Connection,DataSource,getConnection,getManager,getConnectionManager ,getConnectionOptions,createConnection } from 'typeorm';
import { FindAll } from './interface';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly invitation: Repository<Invitation>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Reply) private readonly reply: Repository<Reply>,
    @InjectRepository(ReplyParent) private readonly replyParent: Repository<ReplyParent>,
    private readonly connection:Connection


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

  async update(id: number, updateInvitationDto: UpdateInvitationDto, req: { user: { id: number } }) {
    try {
      let res = await this.invitation.findOne({ where: { id } })
      let result = await this.user.findOne({ where: { id: req.user.id } })
      if (result.id == res.userId) {
        let data = await this.invitation.update(id, updateInvitationDto)
        if (data) {
          return { message: '修改成功' }
        }
      } else {
        return { code: 400, message: '只能由创建人删除' };
      }
    } catch (error) {
      console.log(error)
      return { message: error.message, code: 400 }
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

  async addComment(body, req) {
    if (body.parentId) {
    return   this.saveReply(body, req.user)
    }else{
     return this.saveReplyParent(body, req.user)
    }
   
  }

  async saveReply(body, user) {

    // let connection = await createConnection({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'ChongShao123',
    //   database: 'nuxtproject',
    //   name: 'default', // 指定连接的名称为 "myConnection"
    //   entities:[Reply,ReplyParent],
    //   synchronize: true
    //   });
    

    const queryRunner =this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      
      
        let reply = new Reply();
        reply.context = body.context;
        reply.parentId = body.parentId;
        reply.invitationId = body.invitationId;
        reply.userId = user.id;
        reply.userName = user.username;
       
        let data = await  queryRunner.manager.save(reply)
        console.log(data,'=============')
        let result = await queryRunner.manager.findOne(Reply,{where:{id:2}})
        console.log(result,'=============')
        // await queryRunner.manager.close()
        return {}
      
    } catch (error) {
      console.log(error,'======')
      return { code: 400, message: error.message };
    }finally{
      // await connection.close()
      return {}
    }
  }

  async saveReplyParent(body, user) {
    try {
      let replyParent = new ReplyParent();
      replyParent.context = body.context;
      replyParent.invitationId = body.invitationId;
      replyParent.userId = user.id;
      replyParent.userName = user.username;
      replyParent.commnetNum = 1;
      let data = await this.replyParent.save(replyParent)
      
      console.log(data)
      if(data){
        return {message:"保存成功"}
      }
    } catch (error) {
      return { code: 400, message: error.message };

    }
  }

}
