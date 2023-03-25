import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Invitation,User])],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule {}
