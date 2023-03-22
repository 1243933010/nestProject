import {ExceptionFilter,Catch,ArgumentsHost,HttpException, HttpStatus} from '@nestjs/common';
import {Request,Response} from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        //console.log(exception,'&&&')
        response.status(status).json({
            data:exception,
            time:new Date().getTime(),
            message:exception.message||'',
            //success:false,
            code:HttpStatus.BAD_REQUEST,
            path:request.url,
        })
    }
}
