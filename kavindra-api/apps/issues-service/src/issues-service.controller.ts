import { Controller, Get } from '@nestjs/common';
import { IssuesServiceService } from './issues-service.service';

@Controller()
export class IssuesServiceController {
  constructor(private readonly issuesServiceService: IssuesServiceService) {}

  @Get()
  getHello(): string {
    return this.issuesServiceService.getHello();
  }
}
