import {PrismaModule} from '@app/prisma';
import {Logger, Module} from '@nestjs/common';

import {ClientsController} from './controllers/clients/clients.controller';
import {ClientsRepositoryService} from './repositories/clients-repository/clients-repository.service';
import {ClientsService} from './services/clients/clients.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(ClientsModule.name),
    },
    ClientsService,
    ClientsRepositoryService,
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
