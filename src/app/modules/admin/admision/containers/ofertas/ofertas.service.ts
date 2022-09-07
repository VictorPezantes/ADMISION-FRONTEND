import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IPagination } from '../../../../../shared/interfaces/common.interface';
import { Oferta } from '../../admision.interface';
import { User } from '../../../../../core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    private apiUrl = environment.apiUrl;

    public eventCreate: Subject<void> = new Subject<void>();
    public eventFilters: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    get(queryParams = null): Observable<IPagination<Oferta>> {
        return this._httpClient.get<IPagination<Oferta>>(`${this.apiUrl}oferta/listar`, { params: queryParams });
    }

    getAvailableOffers(queryParams = null): Observable<any> {
        return this._httpClient.get<any>(`${this.apiUrl}oferta/listar-landing`, { params: queryParams });
    }

    create(payload, user: User): Observable<any> {
        payload.offerCreator = user.id;
        return this._httpClient.put<any>(`${this.apiUrl}oferta/registrar`, payload);
    }

    update(payload): Observable<any> {
        return this._httpClient.patch<any>(`${this.apiUrl}oferta/actualizar/`, payload);
        /*se quito de la ruta ${payload.id}*/
    }

    delete(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this.apiUrl}oferta/eliminar/${id}/`);
    }

    cambiarEstado(payload): Observable<any> {
        payload.id = payload?.id;
        payload.estadoOferta = { id: payload?.estadoOferta }
        return this._httpClient.patch<any>(`${this.apiUrl}oferta/actualizar-estado`, payload);
    }

}
