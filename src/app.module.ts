import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/log.module';
import { DndApiModule } from './D&D-api/d&d-api.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    CharactersModule,
    UsersModule,
    AuthModule,
    LogsModule,
    DndApiModule,
  ],
})
export class AppModule {}
