import { NestFactory } from '@nestjs/core';
import { IssuesModule } from './issues.module';

async function bootstrap() {
  const app = await NestFactory.create(IssuesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
