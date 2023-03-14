import { Controller,UseGuards,Get,Post,Req,Body } from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport';
@Controller({
    path:'auth',
    version:'1'
})
export class AuthController {
    // AuthService:any;
    // constructor(private readonly authService:AuthService){}

    @UseGuards(AuthGuard('local'))
    
    @Get(':id')
    testPost1(@Req() req){
        return {};
    }

    @Post('')
    testPost(@Req() req){
        return req.user;
    }

//     @Post('getToken')
//     getTokenByUser(@Body() body){
//         return this.authService.createToken(body)
//     }
}
