import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {UsersServiceModule} from './users-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    UsersServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.USERS_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));