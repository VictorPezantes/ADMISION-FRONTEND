import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { OfertasService } from '../../containers/ofertas/ofertas.service';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import moment from 'moment';
import { Encargado, Estado } from '../../../../../shared/interfaces/common.interface';
import { CommonService } from '../../../../../shared/services/common.service';
import { UserService } from '../../../../../core/user/user.service';
import { User } from '../../../../../core/user/user.types';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss']
})
export class OfferFiltersComponent implements OnInit, AfterViewInit {

    formFilters: FormGroup;

    status: Estado[];
    employees$: Observable<User[]>;

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _userService: UserService,
        private _offerService: OfertasService,
        private _commonService: CommonService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this.employees$ = this._userService.getAll({ paginated: false });
        this.estados();
    }

    ngAfterViewInit(): void {
        this.formFilters.valueChanges
            .pipe(takeUntil(this.unsubscribe), debounceTime(500))
            .subscribe(value => {
                const parsedData = this.castToParams(value);
                console.log(parsedData);
                this._offerService.eventFilters.next(parsedData);
            });
    }

    castToParams(filters) {
        filters.fechaPublicacion = filters?.fechaPublicacion ?
            moment(filters?.fechaPublicacion).format('DD-MM-git YYYY')
            : null
        return filters;
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            search: [''],
            status: [''],
            offer_creator: [''],
            fechaPublicacion: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    estados(): void {
        this._commonService.getStatus().subscribe(estado => (this.status = estado));
    }

}
