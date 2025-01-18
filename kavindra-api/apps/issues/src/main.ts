import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {IssuesModule} from './issues.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    IssuesModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'ISSUES',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
