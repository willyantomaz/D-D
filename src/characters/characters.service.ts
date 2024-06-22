import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DndApiService } from '../D&D-api/d&d-api.service';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
    private readonly dndApiService: DndApiService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const { className, race, spells, level } = createCharacterDto;

    const characterClass = await this.dndApiService.getClass(className);
    if (!characterClass) {
      throw new ValidationException(`Classe ${className} é inválida.`);
    }

    const characterRace = await this.dndApiService.getRace(race);
    if (!characterRace) {
      throw new ValidationException(`Raça ${race} é inválida.`);
    }

    if (spells && spells.length > 0) {
      if (!characterClass.spellcasting) {
        throw new ValidationException(`A classe ${className} não pode lançar magias.`);
      }
      for (const spellName of spells) {
        const spell = await this.dndApiService.getSpell(spellName);
        if (!spell) {
          throw new ValidationException(`Magia ${spellName} é inválida.`);
        }
        if (spell.level > level) {
          throw new ValidationException(`Magia ${spellName} não permitida para o nível ${level}.`);
        }
        const validSpells = characterClass.spellcasting.spells;
        if (!validSpells || !validSpells.includes(spellName.toLowerCase())) {
          throw new ValidationException(`A magia ${spellName} não é válida para a classe ${className}.`);
        }
      }
    }

    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    const updatedCharacter = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true }).exec();
    if (!updatedCharacter) {
      throw new NotFoundException('Character not found');
    }
    return updatedCharacter;
  }

  async remove(id: string): Promise<Character> {
    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
    if (!deletedCharacter) {
      throw new NotFoundException('Character not found');
    }
    return deletedCharacter;
  }

  async createRandom(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const randomName = `RandomHero${Math.floor(Math.random() * 1000)}`;
    const randomAttributes = {
      strength: Math.floor(Math.random() * 20) + 1,
      dexterity: Math.floor(Math.random() * 20) + 1,
      constitution: Math.floor(Math.random() * 20) + 1,
      intelligence: Math.floor(Math.random() * 20) + 1,
      wisdom: Math.floor(Math.random() * 20) + 1,
      charisma: Math.floor(Math.random() * 20) + 1,
    };
    const randomCharacterDto = {
      ...createCharacterDto,
      name: randomName,
      attributes: randomAttributes,
    };
    return this.create(randomCharacterDto);
  }
}
