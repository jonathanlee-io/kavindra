import {RabbitmqModule} from '@app/microservices/rabbitmq/rabbitmq.module';
import {CacheModule} from '@nestjs/cache-manager';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_GUARD, RouterModule} from '@nestjs/core';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';

import {routes} from './app.routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routes),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 5_000,
        limit: 10,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
    }),
    RabbitmqModule.register({serviceName: 'CLIENTS'}),
    RabbitmqModule.register({serviceName: 'EMBED_SCRIPTS'}),
    RabbitmqModule.register({serviceName: 'ISSUES'}),
    RabbitmqModule.register({serviceName: 'PAYMENTS'}),
    RabbitmqModule.register({serviceName: 'PROJECTS'}),
    RabbitmqModule.register({serviceName: 'USERS'}),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
