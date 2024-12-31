import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {EnvironmentVariables, NodeEnvironment} from './lib/config/environment';
import {initApp} from './lib/init/init-app';
import {runPrismaMigrations} from './lib/util/helpers.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  await runPrismaMigrations(configService.get<string>('DATABASE_URL'));

  app.enableCors({
    origin: function (requestOrigin, callback) {
      if (!requestOrigin) {
        callback(null, true);
        return;
      }
      if (
        configService
          .getOrThrow<string>('FRONT_END_URLS')
          .split(',')
          .includes(requestOrigin) ||
        /https:\/\/(.*).kavindra.io|https:\/\/(.*).kavindra-staging.com/.test(
          requestOrigin,
        )
      ) {
        callback(null, true);
        return;
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  initApp(app);

  const port = 3000;
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
