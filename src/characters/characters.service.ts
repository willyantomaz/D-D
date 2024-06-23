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
  private alignmentList = [
    "lawful-neutral", "lawful-evil", "lawful-good", "neutral", "neutral-evil", "neutral-good", 
    "chaotic-neutral", "chaotic-evil", "chaotic-good"
  ];

  private raceList = [
    "human", "dwarf", "dragonborn", "gnome", "elf", "half-elf", "half-orc", "halfling",  "tiefling"
  ]

  private characterClassList = [
    "wizard", "bard", "sorcerer", "fighter", "monk", "paladin", "ranger", "rogue", "barbarian", 
    "warlock", "druid", "cleric" 
  ];

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
        if(!spellName.includes('/')){
          const spell = await this.dndApiService.getSpell(spellName);        
          if (!spell) {
            throw new ValidationException(`Magia ${spellName} é inválida.`);
          }
          if (spell.level > level) {
            throw new ValidationException(`Magia ${spellName} não permitida para o nível ${level}.`);
          }
          const validClasses = this.getClassNameList(spell.classes);        
          if (!validClasses || !validClasses.includes(className.toLowerCase())) {
            throw new ValidationException(`A magia ${spellName} não é válida para a classe ${className}.`);
          }
        }
      }
    }

    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  getClassNameList(classList: Array<any>) {
    const classNameList = [] 
    classList.forEach(classObj => classNameList.push(classObj.index))
    return classNameList; 
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

  async createRandom(name: string): Promise<Character> {
    const randomAttributes = {
      strength: Math.floor(Math.random() * 20) + 1,
      dexterity: Math.floor(Math.random() * 20) + 1,
      constitution: Math.floor(Math.random() * 20) + 1,
      intelligence: Math.floor(Math.random() * 20) + 1,
      wisdom: Math.floor(Math.random() * 20) + 1,
      charisma: Math.floor(Math.random() * 20) + 1,
    };
    const randomCharacterDto = new CreateCharacterDto;

    randomCharacterDto.level = Math.floor((Math.random() * 20) + 1)
    randomCharacterDto.name = name;
    randomCharacterDto.attributes = randomAttributes;
    randomCharacterDto.className = this.characterClassList[Math.floor(Math.random() * this.characterClassList.length)];
    randomCharacterDto.race = this.raceList[Math.floor(Math.random() * this.raceList.length)];
    randomCharacterDto.alignment = this.alignmentList[Math.floor(Math.random() * this.alignmentList.length)];

    const spellList =  (await this.dndApiService.getSpellsByClass(randomCharacterDto.className)).results
    const featuresList = (await this.dndApiService.getFeaturesByClass(randomCharacterDto.className)).results

    randomCharacterDto.spells = this.filterAndSelectSpells(spellList, randomCharacterDto.level);
    randomCharacterDto.feats = this.filterAndSelectFeatures(featuresList, randomCharacterDto.level);
    randomCharacterDto.items = await this.getItems()

    return this.create(randomCharacterDto);
  }

  private filterAndSelectFeatures(features: Array<any>, level: number) {    
    const numFeatures = Math.min(level + 3, features.length);

    const selectedFeatures = [];
    const featuresPool = [...features];
  
    for (let i = 0; i < numFeatures; i++) {
      const randomIndex = Math.floor(Math.random() * featuresPool.length);
      const selectedFeature = featuresPool.splice(randomIndex, 1)[0];
      selectedFeatures.push(selectedFeature.name);
    }
  
    return selectedFeatures;
  }

  private filterAndSelectSpells(spells: Array<any>, level: number) {
    const validSpells = spells.filter(spell => spell.level <= level);
  
    const numSpells = Math.min(level + 4, validSpells.length);

    const selectedSpells = [];
    const spellPool = [...validSpells];
  
    for (let i = 0; i < numSpells; i++) {
      const randomIndex = Math.floor(Math.random() * spellPool.length);
      const selectedSpell = spellPool.splice(randomIndex, 1)[0];
      selectedSpells.push(selectedSpell.name);
    }
    return selectedSpells;
  }

  async getItems() {
    const selectedItems = [];
    const items =  (await this.dndApiService.getEquipments()).results
    const itemPool = [...items];
  
    for (let i = 0; i < 3; i++) {
      if (itemPool.length === 0) break; 
      const randomIndex = Math.floor(Math.random() * itemPool.length);
      const selectedItem = itemPool.splice(randomIndex, 1)[0];
      selectedItems.push(selectedItem.name);
    }
  
    return selectedItems;
  }
}
