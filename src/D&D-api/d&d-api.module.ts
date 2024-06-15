import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DndApiService } from './d&d-api.service';

@Module({
  imports: [HttpModule],
  providers: [DndApiService],
  exports: [DndApiService],
})
export class DndApiModule {}
