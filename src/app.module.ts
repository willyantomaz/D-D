import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/log.module';
import { DndApiModule } from './D&D-api/d&d-api.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CharactersModule,
    AuthModule,
    UsersModule,
    LogsModule,
    DndApiModule,
  ],
})
export class AppModule {}
