import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {ClientsModule} from './clients.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ClientsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'clients',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
