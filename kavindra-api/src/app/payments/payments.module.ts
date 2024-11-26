import {Logger, Module} from '@nestjs/common';

import {PaymentsController} from './controllers/payments/payments.controller';
import {PaymentsRepositoryService} from './repositories/payments-repository/payments-repository.service';
import {PaymentsService} from './services/payments/payments.service';
import {PrismaModule} from '../../lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PaymentsModule.name),
    },
    PaymentsService,
    PaymentsRepositoryService,
  ],
  exports: [PaymentsService, PaymentsRepositoryService],
})
export class PaymentsModule {}
