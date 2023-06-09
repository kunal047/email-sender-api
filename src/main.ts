import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://smartlead.0xkrc.dev'],
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
