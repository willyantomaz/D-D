import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const character = await this.charactersService.findOne(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  // Outros métodos CRUD...
}
