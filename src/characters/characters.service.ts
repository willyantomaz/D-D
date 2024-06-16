import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DndApiService } from '../D&D-api/d&d-api.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
    private readonly dndApiService: DndApiService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const { className } = createCharacterDto;

    const classInfo = await this.dndApiService.getClassInfo(className).toPromise();

    const characterData = {
      ...createCharacterDto,
      classInfo,
    };

    const createdCharacter = new this.characterModel(characterData);
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
}
