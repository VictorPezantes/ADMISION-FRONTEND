import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AbstractChoice, Cargo, Encargado, Estado} from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = environment.apiUrl;

  constructor(
      private _httpClient: HttpClient,
  ) { }

  getStatus(queryParams = null): Observable<Estado[]> {
    return this._httpClient.get<Estado[]>(`${this.apiUrl}estado/lista`, {params: queryParams});
  }

  getPositions(queryParams = null): Observable<AbstractChoice[]> {
    return this._httpClient.get<AbstractChoice[]>(`${this.apiUrl}common/position-applies/`, {params: queryParams});
  }

  getCivilStatus(queryParams = null): Observable<AbstractChoice[]> {
    return this._httpClient.get<AbstractChoice[]>(`${this.apiUrl}common/civil-status/`, {params: queryParams});
  }
}
