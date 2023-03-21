import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './user/user.controller';
import { PermissionModule } from './permission/permission.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type:"mysql",
      username:'root',
      password:'ChongShao123',
      host:'localhost',
      port:3306,
      database:'nuxtproject',
      entities:[__dirname + '/**/*.entity{.ts.js}'],
      synchronize:true,
      retryDelay:500,
      retryAttempts:10,
      autoLoadEntities:true

    }),
    PermissionModule,
    UploadModule
  ],
  controllers: [AppController,UserController],
  providers: [AppService,],
})
export class AppModule {}
