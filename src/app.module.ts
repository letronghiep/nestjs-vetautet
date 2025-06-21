import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLoggerDev } from './logger/my-logger.dev';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyLoggerDev],
})
export class AppModule {}
