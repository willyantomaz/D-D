import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character, CharacterSchema } from './character.schema';
import { DndApiModule } from '../D&D-api/d&d-api.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    DndApiModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
