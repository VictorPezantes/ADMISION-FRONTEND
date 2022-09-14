import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractChoice, Cargo, Estado, IDialogData} from '../../../../../shared/interfaces/common.interface';
import {CommonService} from '../../../../../shared/services/common.service';
import {OfertasService} from '../../containers/ofertas/ofertas.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../../../core/auth/auth.service';
import { User } from 'app/core/user/user.types';
import {UserService} from '../../../../../core/user/user.service';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';


@Component({
    selector: 'app-postulant-offer',
    templateUrl: './create-postulant.component.html',
    styleUrls: ['./create-postulant.component.scss']
})
export class CreatePostulantComponent implements OnInit, OnDestroy {

    formActions: FormGroup;

    cargoOferta$: Observable<AbstractChoice[]>;

    user: User;

    _unsubscribeAll = new Subject<void>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<CreatePostulantComponent>,
        private _fb: UntypedFormBuilder,
        private _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        private _commonService: CommonService,
        private _postulacionService: PostulacionesService,
        private _snackBar: MatSnackBar
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        this.cargoOferta$ = this._commonService.getPositions();

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            titulo: [null, [Validators.required]],
            requisito: [null, [Validators.required]],
            descripcion: [null, [Validators.required]],
            cargoOferta: [null, [Validators.required]],
/*  se modifica*/ 

        });
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    get id(): FormControl {
        return this.formActions.get('id') as FormControl;
    }

    createOrEditOffer(): void {
        if (this.formActions.valid) {
            this._ngxSpinner.show();
            const payload = this.castToPayload(this.formActions.getRawValue());
            this.evaluateTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    castToPayload(rawValue) {
        const payload = {...rawValue};
        console.log('payload ==> ', payload);
        payload.cargoOferta = payload?.cargoOferta || null;
        return payload;
    }
    

    async evaluateTransaction(payload) {
        try {
            await this.createOrUpdateOffer(payload).toPromise();
            this.dialogRef.close();
        } catch (err) {
            this._snackBar.open('Error al crear al oferta',
                'Cancelar', { duration: 2000 })
            throw new Error(err);
        } finally {
            this._ngxSpinner.hide();
        }
    }

    createOrUpdateOffer(payload): Observable<any> {
        if (payload?.id) {
            return this._postulacionService.update(payload);
        }
        return this._postulacionService.create(payload, this.user);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
