import { Injectable, Inject ,Logger as defaultLogger} from '@nestjs/common';
import { Cron,Interval,Timeout } from '@nestjs/schedule';
import { Logger } from 'winston';
import { WinstonClass } from '../../common/winston';
@Injectable()
export class ScheduleService {
    private readonly defaultlogger = new defaultLogger()
    private readonly logger =  WinstonClass()
   constructor(){}

  @Cron('45 * * * * *')  //每搁一分钟执行一次，从第45s开始
  handleTimeout() {
    console.log('45 * * * * *')
    this.defaultlogger.log('执行任务开始执行了');
    this.logger.info('执行任务开始执行了');

  }
}
