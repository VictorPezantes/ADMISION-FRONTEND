import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IPagination} from '../../../../../shared/interfaces/common.interface';
import {Oferta} from '../../admision.interface';
import {User} from '../../../../../core/user/user.types';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  private apiUrl = environment.apiUrl;

  public eventCreate: Subject<void> = new Subject<void>();
  eventFilters: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
      private _httpClient: HttpClient,
  ) { }

  get(queryParams = null): Observable<IPagination<Oferta>> {
    return this._httpClient.get<IPagination<Oferta>>(`${this.apiUrl}admision/postulants/`, {params: queryParams});
  }

  create(payload, user: User): Observable<any> {
    payload.offerCreator = user.id;
    return this._httpClient.post<any>(`${this.apiUrl}admision/postulants/`, payload);
  }

  update(payload): Observable<any> {
    return this._httpClient.patch<any>(`${this.apiUrl}admision/postulants/{payload.id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}admision/postulants/${id}/`);
  }
}
