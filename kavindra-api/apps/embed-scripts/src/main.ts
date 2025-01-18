import {NestFactory} from '@nestjs/core';

import {EmbedScriptsModule} from './embed-scripts.module';

async function bootstrap() {
  const app = await NestFactory.create(EmbedScriptsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
