import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estado, IDialogData } from '../../../../../shared/interfaces/common.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../../shared/services/common.service';
import { OfertasService } from '../../containers/ofertas/ofertas.service';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-change-status',
    templateUrl: './change-status.component.html',
    styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {

    formActions: FormGroup;

    status: Estado[];

    constructor(
        private _fb: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<ChangeStatusComponent>,
        private _ngxSpinner: NgxSpinnerService,
        private _commonService: CommonService,
        private _offerService: OfertasService,
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        this.estados();
    }

    get id(): FormControl {
        return this.formActions.get('id') as FormControl;
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null, [Validators.required]],
            estadoOferta: [null, [Validators.required]],
        });
    }

    updateStatus(): void {
        if (this.formActions.valid) {
            this._ngxSpinner.show();
            const payload = this.formActions.getRawValue();
            this.evaluateTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async evaluateTransaction(payload) {
        try {
            await this._offerService.cambiarEstado(payload).toPromise();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            this._ngxSpinner.hide();
        }
    }

    estados(): void {
        this._commonService.getStatus().subscribe(estado => (this.status = estado));
        //console.log(this.status);
    }

}
