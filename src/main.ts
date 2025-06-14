import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add global middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('Before...', req.url);
    next();
    console.log('After...');
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
