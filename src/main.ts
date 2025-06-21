import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MyLogger } from './logger/my-logger';
import { MyLoggerDev } from './logger/my-logger.dev';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: new MyLogger(),
    // bufferLogs: true,
  });
  app.useLogger(new MyLogger());
  app.useStaticAssets(join(__dirname, '../uploads'), {prefix: '/uploads'});
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
