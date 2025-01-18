import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {ProjectsModule} from './projects.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ProjectsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'PROJECTS',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
