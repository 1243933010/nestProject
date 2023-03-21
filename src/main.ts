import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {VersioningType} from '@nestjs/common'
import {NestExpressApplication} from '@nestjs/platform-express'
import {Request,Response,NextFunction } from 'express'
import {Respon} from './common/response'
import {HttpFilter} from './common/filter'
import { join } from 'path'

function MiddleWareAll(req:Request,res:Response,next:NextFunction){  //全局中间件
  console.log(`全局中间件:当前请求接口${req.originalUrl}`);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({    //给当前所有接口添加版本前缀比如/v1
    type:VersioningType.URI
  })
  app.useStaticAssets(join(__dirname,'./../src/images'),{
    prefix:'/images'
  })
  app.useGlobalInterceptors(new Respon());  //全局响应拦截
  app.useGlobalFilters(new HttpFilter());   //全局异常过滤器
  app.use(MiddleWareAll);
  await app.listen(3003);
}
bootstrap();
