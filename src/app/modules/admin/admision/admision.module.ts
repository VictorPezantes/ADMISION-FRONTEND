import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmisionComponent } from './admision.component';
import { PostulacionesComponent } from './containers/postulaciones/postulaciones.component';
import { OfertasComponent } from './containers/ofertas/ofertas.component';
import { EntrevistasComponent } from './containers/entrevistas/entrevistas.component';
import { ExamenMedicoComponent } from './containers/examen-medico/examen-medico.component';
import { EvaluacionesComponent } from './containers/evaluaciones/evaluaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './containers/configuracion/configuracion.component';
import { OfferFiltersComponent } from './components/offer-filters/offer-filters.component';
import { OfferActionsComponent } from './components/offer-actions/offer-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeStatusComponent } from './components/change-status/change-status.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../../../shared/shared.module';
import { PostulantFiltersComponent } from './components/postulant-filters/postulant-filters.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { CreatePostulantComponent } from './components/create-postulant/create-postulant.component';


const routes: Routes = [
    {
        path: '',
        component: AdmisionComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'postulaciones',
            },
            {
                path: 'postulaciones',
                component: PostulacionesComponent,
            },
            {
                path: 'ofertas',
                component: OfertasComponent,
            },
            {
                path: 'entrevistas',
                component: EntrevistasComponent,
            },
            {
                path: 'examen-medico',
                component: ExamenMedicoComponent,
            },
            {
                path: 'evaluaciones',
                component: EvaluacionesComponent,
            },
            {
                path: 'configuracion',
                component: ConfiguracionComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        AdmisionComponent,
        PostulacionesComponent,
        OfertasComponent,
        EntrevistasComponent,
        ExamenMedicoComponent,
        EvaluacionesComponent,
        ConfiguracionComponent,
        OfferFiltersComponent,
        OfferActionsComponent,
        CreateOfferComponent,
        ChangeStatusComponent,
        PostulantFiltersComponent,
        EditOfferComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatCardModule,
        MatTooltipModule,
        MatMenuModule,
        MatDialogModule,
        MatSidenavModule,
        SharedModule,
    ],
    entryComponents: [
        CreateOfferComponent,
        ChangeStatusComponent,
        EditOfferComponent,
        CreatePostulantComponent
    ]
})
export class AdmisionModule {
}
