import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {UsersModule} from './users.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    UsersModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'USERS',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
