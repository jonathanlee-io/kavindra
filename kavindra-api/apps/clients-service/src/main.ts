import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {ClientsServiceModule} from './clients-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ClientsServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.CLIENTS_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
