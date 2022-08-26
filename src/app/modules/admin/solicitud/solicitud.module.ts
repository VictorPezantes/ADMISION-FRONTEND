import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SolicitudComponent} from './solicitud.component';
import {RegistrarPostulacionComponent} from './containers/registrar-postulacion/registrar-postulacion.component';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
    {
        path: '',
        component: SolicitudComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'registrar-solicitud',
            },
            {
                path: 'registrar-solicitud',
                component: RegistrarPostulacionComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        SolicitudComponent,
        RegistrarPostulacionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MaterialFileInputModule,
        MatIconModule,
        MatRadioModule,
        MatButtonModule
    ]
})
export class SolicitudModule {
}
