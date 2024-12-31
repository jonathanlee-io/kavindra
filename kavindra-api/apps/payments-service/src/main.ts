import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {PaymentsServiceModule} from './payments-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    PaymentsServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.PAYMENTS_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
