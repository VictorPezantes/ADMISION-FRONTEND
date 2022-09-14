import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OfertasService} from '../../../../admin/admision/containers/ofertas/ofertas.service';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-ofertas-laborales',
    templateUrl: './ofertas-laborales.component.html',
    styleUrls: ['./ofertas-laborales.component.scss'],
})
export class OfertasLaboralesComponent implements OnInit {

    search = new FormControl(null, [Validators.required]);

    availableOffers = [];

    constructor(
        private _router: Router,
        private _offerService: OfertasService,
    ) {
    }

    ngOnInit(): void {
        this._offerService.getAvailableOffers({paginated: true})
            .subscribe(results => {
                //console.log(results);
                this.availableOffers = results.content;
            });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    goLogin(): void {
        this._router.navigateByUrl('solicitud/registrar-solicitud');
    }

    cancel(): void {
        this._router.navigateByUrl('solicitud/registrar-solicitud');
    }

}
