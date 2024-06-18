import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DndApiService {
  private readonly apiUrl: string = 'https://www.dnd5eapi.co/api';

  constructor(private readonly httpService: HttpService) {}

  getClassInfo(className: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(`${this.apiUrl}/classes/${className}`).pipe(
      map((response: AxiosResponse<any>) => response.data),
      catchError(error => {
        throw new HttpException('Error fetching class info', HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }

  getSpellInfo(spellName: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(`${this.apiUrl}/spells/${spellName}`).pipe(
      map((response: AxiosResponse<any>) => response.data),
      catchError(error => {
        throw new HttpException('Error fetching spell info', HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }

 
}
