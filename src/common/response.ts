import {Injectable,NestInterceptor,CallHandler} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Data<T>{
    data:T
}

@Injectable()
export class Respon<T> implements NestInterceptor{
        intercept(context, next: CallHandler):Observable<Data<T>>{
            return next.handle().pipe(map(data=>{
                // console.log(data)
                let result = JSON.parse(JSON.stringify(data));
                Reflect.deleteProperty(result,'message')
                Reflect.deleteProperty(result,'code')
                return {
                    data:result,
                    code:data?.code?data.code:0,
                    message:data?.message?data.message:'success'
                }
            }))
    }
}