import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Countries } from './interfaces/interface.countries.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllCountries(): Promise<Countries> {
    return this.appService.getAllCountries();
  }
}
