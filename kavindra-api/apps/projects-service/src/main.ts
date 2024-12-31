import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {ProjectsServiceModule} from './projects-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ProjectsServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.PROJECTS_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
