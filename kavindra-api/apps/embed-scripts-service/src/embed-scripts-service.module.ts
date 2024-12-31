import { Module } from '@nestjs/common';
import { EmbedScriptsServiceController } from './embed-scripts-service.controller';
import { EmbedScriptsServiceService } from './embed-scripts-service.service';

@Module({
  imports: [],
  controllers: [EmbedScriptsServiceController],
  providers: [EmbedScriptsServiceService],
})
export class EmbedScriptsServiceModule {}
