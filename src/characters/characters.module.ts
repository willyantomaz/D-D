import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    JwtModule,
    PassportModule
  ],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
