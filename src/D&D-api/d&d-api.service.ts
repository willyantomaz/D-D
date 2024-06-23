import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DndApiService {
  private readonly apiBase = 'https://www.dnd5eapi.co/api';

  constructor(private readonly httpService: HttpService) {}

  async getClass(className: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/classes/${className.toLowerCase()}`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Classe inválida');
    }
  }

  async getRace(raceName: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/races/${raceName.toLowerCase()}`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Raça inválida');
    }
  }

  async getSpell(spellName: string) {
    try {      
      const { data } = await this.httpService.get(`${this.apiBase}/spells/${(spellName.toLowerCase()).replace(/ /g, '-')}`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Magia inválida');
    }
  }

  async getFeats(featName: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/features?name=${featName.toLowerCase()}`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Feature inválida');
    }
  }

  async getAttributeByLevel(level: string, attribute: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/${attribute}?level=${level.toLowerCase()}`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Feature inválida');
    }
  }

  async getSpellsByClass(characterClass: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/classes/${characterClass}/spells`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Classe inválida');
    }
  }

  async getFeaturesByClass(characterClass: string) {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/classes/${characterClass}/features`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Classe inválida');
    }
  }

  async getEquipments() {
    try {
      const { data } = await this.httpService.get(`${this.apiBase}/equipment`).toPromise();
      return data;
    } catch (error) {
      throw new NotFoundException('Não foram encontrados os equipamentos');
    }
  }
}
