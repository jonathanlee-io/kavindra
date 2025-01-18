import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {PaymentsModule} from './payments.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    PaymentsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'PAYMENTS',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
