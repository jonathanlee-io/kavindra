import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {IssuesServiceModule} from './issues-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    IssuesServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.ISSUES_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
