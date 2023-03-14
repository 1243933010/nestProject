import { Injectable,UnauthorizedException } from '@nestjs/common';
//import {JwtService} from '@nestjs/jwt'
import { UserService } from '../../user/user.service';
import {User} from 'src/user/entities/user.entity'
@Injectable()
export class AuthService {
    constructor(
        //private readonly jwtService:JwtService,
        private readonly userService:UserService
    ){
        this.userService = userService;
    }

    // async createToken(user){
    //     const payload = {username:user.name,password:user.password};
    //     //接下来应该调数据库查看用户是否正确
    //     delete user.password;
    //     return {
    //         message:'创建token成功',
    //         //token:this.jwtService.sign(payload)
    //     }
    // }
    async validate(username: string, password: string): Promise<User> {
        const user = await this.userService.findAll(username);
        // 注：实际中的密码处理应通过加密措施
        if (user && user.password === password) {
          const { password, ...userInfo } = user;
          return userInfo;
        } else {
          return null;
        }
      }
}
