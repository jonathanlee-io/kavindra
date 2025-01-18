import {EnvironmentVariables} from '@app/config';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {RmqContext, RmqOptions, Transport} from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getOptions(serviceName: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.getOrThrow<string>('RABBITMQ_URLS')],
        queue: this.configService.get<string>(
          `RABBIT_MQ_${serviceName}_QUEUE` as any,
        ),
        queueOptions: {
          durable: true,
        },
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
