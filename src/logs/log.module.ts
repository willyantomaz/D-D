import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './log.service';
import { Log, LogSchema } from './log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule implements NestModule {
  constructor(private readonly logsService: LogsService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        this.logsService.create({
          route: req.originalUrl,
          method: req.method,
          responseTime: duration,
        });
      });
      next();
    }).forRoutes('*');
  }
}
