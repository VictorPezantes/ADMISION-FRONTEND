import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {SolicitudService} from '../../solicitud.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {AbstractChoice} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-registrar-postulacion',
    templateUrl: './registrar-postulacion.component.html',
    styleUrls: ['./registrar-postulacion.component.scss']
})
export class RegistrarPostulacionComponent implements OnInit {

    formActions: FormGroup;
    civilStatus$: Observable<AbstractChoice[]>;

    unsubscribe = new Subject<void>();

    constructor(
        private _fb: UntypedFormBuilder,
        private _ngxSpinnerService: NgxSpinnerService,
        private _requestService: SolicitudService,
        private _commonService: CommonService,
        private _snackService: MatSnackBar,
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
        this.civilStatus$ = this._commonService.getCivilStatus({paginated: false});

        this._requestService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => {
                this.createRequest();
            });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            name: [null, [Validators.required]],
            secondName: [null],
            lastName: [null, [Validators.required]],
            surName: [null],
            documentNumber: [null, [Validators.required]],
            address: [null],
            email: [null, [Validators.required, Validators.email]],
            secondaryEmail: [null],
            birthDate: [null, [Validators.required]],
            civilStatus: [null],
            department: [null],
            province: [null],
            district: [null],
            phone: [null, [Validators.required]],
            cellphone: [null],
            secondCellphone: [null],
            status: [null],
            isTravel: [null],
            isExperience: [null],
            professionDescription: [null],
            profesionLocation: [null],
            profesionLastCourse: [null],
            profesionCompany: [null],
            workDescription: [null],
            workStart: [null],
            workEnd: [null],
            workCompany: [null],
            workExitDescription: [null],
            curriculumFile: [null],
            documentFile: [null],
            imageFile: [null],
        });
    }

    createRequest(): void {
        if (this.formActions.valid) {
            this._ngxSpinnerService.show();
            const payload = this.formActions.getRawValue();
            payload.birthDate = payload.birthDate ? moment(payload.birthDate).format('YYYY-MM-DD') : null;
            payload.workStart = payload.workStart ? moment(payload.workStart).format('YYYY-MM-DD') : null;
            payload.workEnd = payload.workEnd ? moment(payload.workEnd).format('YYYY-MM-DD') : null;
            this.createTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async createTransaction(payload): Promise<void> {
        try {
            await this._requestService.registerRequest(payload).toPromise();
            this._snackService.open('Solicitud registrada correctamente', 'Cerrar', {duration: 2000});
            this.formActions.reset();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
