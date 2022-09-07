import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../solicitud.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AbstractChoice, Departamento, Distrito, Provincia } from '../../../../../shared/interfaces/common.interface';
import { CommonService } from '../../../../../shared/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-registrar-postulacion',
    templateUrl: './registrar-postulacion.component.html',
    styleUrls: ['./registrar-postulacion.component.scss']
})
export class RegistrarPostulacionComponent implements OnInit {

    formActions: FormGroup;
    civilStatus$: Observable<AbstractChoice[]>;
    departamento: Departamento[] = [];
    //provincia: Provincia[];

    provincia: Provincia[] = [
        { id: 1, name: "Lima Provincia" },
        { id: 2, name: "Callao Provincia" }
    ];

    distrito: Distrito[] = [
        { id: 1, name: "Lima Distrito" },
        { id: 2, name: "Callao Distrito" }
    ];

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
        this.civilStatus$ = this._commonService.getCivilStatus({ paginated: false });
        this._commonService.getDepartamento().subscribe(departament => { this.departamento = departament; });
        //this._commonService.getProvincia().subscribe(provincia => { this.provincia = provincia; });

        this._requestService.eventCreate
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => {
                this.createRequest();
            });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            // Datos Personales
            primerNombre: [null, [Validators.required]],
            segundoNombre: [null],
            apellidoPaterno: [null, [Validators.required]],
            apellidoMaterno: [null],
            dni: [null, [Validators.required]],
            idEstadoCivil: [null, [Validators.required]],
            fechaNacimiento: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            idDepartamento: [null, [Validators.required]],
            idProvincia: [null, [Validators.required]],
            idDistrito: [null, [Validators.required]],
            telefonoFijo: [null],
            // Datos de Contacto
            celular: [null, [Validators.required]],
            celularFamiliar: [null],
            email: [null, [Validators.required, Validators.email]],
            emailSecundario: [null],
            // Datos Academicos
            profesion: [null],
            lugarEstudios: [null],
            ultimoCursoRealizado: [null],
            empresaCurso: [null],
            // Datos laborales
            trabajoReciente: [null],
            fechaIngresoTrabajoReciente: [null],
            fechaSalidaTrabajoReciente: [null],
            empresaTrabajoReciente: [null],
            motivoSalidaTrabajoReciente: [null],
            //ANEXAR DOCUMENTOS 
            curriculum: [null, [Validators.required]],
            dniFrontal: [null],
            dniPosterior: [null],
            foto: [null],
            // Opciones
            disponibilidadViajar: [null, [Validators.required]],
            experienciaRubro: [null, [Validators.required]],

        });
    }

    createRequest(): void {
        if (this.formActions.valid) {
            this._ngxSpinnerService.show();
            const payload = this.formActions.getRawValue();
            payload.fechaNacimiento = payload.fechaNacimiento ? moment(payload.fechaNacimiento).format('YYYY-MM-DD') : null;
            payload.fechaIngresoTrabajoReciente = payload.fechaIngresoTrabajoReciente ? moment(payload.fechaIngresoTrabajoReciente).format('YYYY-MM-DD') : null;
            payload.motivoSalidaTrabajoReciente = payload.motivoSalidaTrabajoReciente ? moment(payload.motivoSalidaTrabajoReciente).format('YYYY-MM-DD') : null;
            this.createTransaction(payload);
        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async createTransaction(payload): Promise<void> {
        try {
            await this._requestService.registerRequest(payload).toPromise();
            this._snackService.open('Solicitud registrada correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

    obtenerProvincia(option) {
        this._commonService.getProvincia(option).subscribe(provincias => {
            //this.provincia = provincias;
            //var dato = JSON.stringify(this.provincia);
            console.log(provincias);
        });
        //console.log("aqui " + option.nombre + " su estado es " + option.estado);
    }

}
