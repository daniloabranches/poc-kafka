import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('singlemessage')
  async sendSingleMessage(@Query('message') message): Promise<void> {
    return await this.appService.sendSingleMessage(message);
  }

  @Get('endlessmessages')
  async sendEndlessMessages(): Promise<void> {
    return await this.appService.sendEndlessMessages();
  }
}
