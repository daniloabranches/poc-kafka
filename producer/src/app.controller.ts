import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async sendMessage(@Query('message') message): Promise<void> {
    return await this.appService.sendMessage(message);
  }
}
