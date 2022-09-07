import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { OfertasService } from './ofertas.service';
import { Oferta } from '../../admision.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { CreateOfferComponent } from '../../components/create-offer/create-offer.component';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { ChangeStatusComponent } from '../../components/change-status/change-status.component';
import { AdmisionService } from '../../admision.service';
import { IPagination } from '../../../../../shared/interfaces/common.interface';
import { EditOfferComponent } from '../../components/edit-offer/edit-offer.component';

@Component({
    selector: 'app-ofertas',
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Oferta[] = [];
    displayedColumns: string[] = ['estado', 'ofertas', 'postulantes', 'creador', 'fecha_publicacion', 'actions'];

    count = 0;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private _offerService: OfertasService,
        private _admisionService: AdmisionService,
    ) {
        this._admisionService.title.next('Ofertas');
    }

    ngOnInit(): void {
        this._offerService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => this.createOrEditOffer());
    }

    ngAfterViewInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Items por página.';

        this.initPagination();
    }

    initPagination(): void {
        merge(this.paginator.page, this.changesSubject, this._offerService.eventFilters)
            .pipe(
                switchMap(() => {
                    this._ngxSpinner.show();
                    const rawValue = this._offerService.eventFilters.value;
                    const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
                    const queryParamsByPaginator = { ...filters } as any;
                    queryParamsByPaginator.limit = this.paginator.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
                    return this._offerService.get(queryParamsByPaginator);
                })
            ).subscribe((response) => {
                this._ngxSpinner.hide();
                this.count = response.count;
                this.dataSource = response.content;
                //console.log(this.dataSource);
            });
    }

    createOrEditOffer(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CreateOfferComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    EditOffer(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(EditOfferComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }


    changeStatusOffer(element?): void {
        const dialogData = {
            data: {
                meta: element
            },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ChangeStatusComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
