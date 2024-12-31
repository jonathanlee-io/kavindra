import { Controller, Get } from '@nestjs/common';
import { EmbedScriptsServiceService } from './embed-scripts-service.service';

@Controller()
export class EmbedScriptsServiceController {
  constructor(private readonly embedScriptsServiceService: EmbedScriptsServiceService) {}

  @Get()
  getHello(): string {
    return this.embedScriptsServiceService.getHello();
  }
}
