import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.charactersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('random')
  async createRandom(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.createRandom(createCharacterDto);
  }
  
}
