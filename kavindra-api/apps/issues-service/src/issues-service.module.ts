import { Module } from '@nestjs/common';
import { IssuesServiceController } from './issues-service.controller';
import { IssuesServiceService } from './issues-service.service';

@Module({
  imports: [],
  controllers: [IssuesServiceController],
  providers: [IssuesServiceService],
})
export class IssuesServiceModule {}
