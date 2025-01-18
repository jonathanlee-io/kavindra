import { Module } from '@nestjs/common';
import { MicroservicesService } from './microservices.service';

@Module({
  providers: [MicroservicesService],
  exports: [MicroservicesService],
})
export class MicroservicesModule {}
