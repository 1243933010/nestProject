import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtKey } from './config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
@Module({
  imports:[
    UserModule,
    // PassportModule.register({defaultStrategy:'jwt'}),
    // JwtModule.register({
    //   secret:jwtKey.secret,
    //   signOptions:{
    //     expiresIn:'360s'
    //   }
    // })
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
