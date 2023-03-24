import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { AuthGuard } from '@nestjs/passport';
import {CreateInvitationPipe} from './pipe/pipe.pipe'
@Controller({
  path:'invitation',
  version:'1'
})
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  create(@Body(CreateInvitationPipe) createInvitationDto: CreateInvitationDto) {
    return this.invitationService.create(createInvitationDto);
  }

  
  @Get()
  findAll(@Query() Query) {
    return this.invitationService.findAll(Query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationService.update(+id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.remove(+id);
  }
}
