import {EnvironmentVariables, NodeEnvironment} from '@app/config';
import {initApp} from '@app/init';
import {runPrismaMigrations} from '@app/util';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  await runPrismaMigrations(configService.getOrThrow<string>('DATABASE_URL'));

  initApp(app);

  const port = 8000;
  Logger.log(
    `Attempting to listen on port ${port} in NODE_ENV: ${configService.getOrThrow<NodeEnvironment>('NODE_ENV')}...`,
  );
  await app.listen(port, () => {
    Logger.log(
      `Listening on port ${port} in NODE_ENV: ${configService.getOrThrow<NodeEnvironment>('NODE_ENV')}...`,
    );
  });
}
bootstrap().catch((error) => console.error(error));
