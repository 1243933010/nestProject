import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path:'user',
  version:'1'
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService:AuthService
    ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
 async findAll(@Body() body:{username:string,password:string}) {
    const AuthService = await this.authService.validateUser(
      body.username,body.password
    )
    console.log(AuthService,'---')
    if(AuthService.code==200){
      // return AuthService;
      return this.authService.certificate(AuthService);
    }
    return {message:AuthService.message,code:AuthService.code};
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('userInfo')
  async getUserInfo(@Body() body:{username:string,password:string}) {
    return this.userService.getUserInfo(body.username)
   }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return {message:'success'}
    // return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
