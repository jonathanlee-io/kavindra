import {serviceNames} from '@kavindra/constants';
import {createRabbitMqConsumerMicroservice} from '@kavindra/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {EmbedScriptsServiceModule} from './embed-scripts-service.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    EmbedScriptsServiceModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    serviceNames.EMBED_SCRIPTS_SERVICE,
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
