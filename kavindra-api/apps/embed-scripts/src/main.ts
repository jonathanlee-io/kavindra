import {createRabbitMqConsumerMicroservice} from '@app/microservices/micro.utils';
import {configDotenv} from 'dotenv';

import {EmbedScriptsModule} from './embed-scripts.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    EmbedScriptsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    'EMBED_SCRIPTS',
  );
  await app.listen();
}

bootstrap().catch((err) => console.error(err));
