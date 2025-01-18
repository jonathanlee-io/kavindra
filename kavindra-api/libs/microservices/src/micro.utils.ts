import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

export const createRabbitMqConsumerMicroservice = async (
  module: unknown,
  rabbitMqUrls: string[],
  queueName: string,
) => {
  return NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.RMQ,
    options: {
      urls: rabbitMqUrls,
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
};
