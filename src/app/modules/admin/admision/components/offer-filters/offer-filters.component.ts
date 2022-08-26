import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder} from '@angular/forms';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {debounceTime, Observable, Subject, takeUntil} from 'rxjs';
import moment from 'moment';
import {Encargado, Estado} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {UserService} from '../../../../../core/user/user.service';
import {User} from '../../../../../core/user/user.types';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss']
})
export class OfferFiltersComponent implements OnInit, AfterViewInit {

    formFilters: FormGroup;

    status: Estado[] = [
        {id: 1, name: 'Pendiente'},
        {id: 2, name: 'Aprobada'},
        {id: 3, name: 'Rechazada'}
    ];
    employees$: Observable<User[]>;

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _userService: UserService,
        private _offerService: OfertasService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this.employees$ = this._userService.getAll({paginated: false});
    }

    ngAfterViewInit(): void {
        this.formFilters.valueChanges
            .pipe(takeUntil(this.unsubscribe), debounceTime(500))
            .subscribe(value => {
                const parsedData = this.castToParams(value);
                this._offerService.eventFilters.next(parsedData);
            });
    }

    castToParams(filters) {
        filters.publication_date = filters?.publication_date ?
            moment(filters?.publication_date).format('DD-MM-git YYYY')
            : null
        return filters;
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            search: [''],
            status: [''],
            offer_creator: [''],
            publication_date: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
