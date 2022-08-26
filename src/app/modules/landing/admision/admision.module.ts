import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmisionComponent} from './admision.component';
import {OfertasLaboralesComponent} from './containers/ofertas-laborales/ofertas-laborales.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: AdmisionComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ofertas-laborales'},
            {
                path: 'ofertas-laborales',
                component: OfertasLaboralesComponent,
            }
        ]
    }
];

@NgModule({
    declarations: [
        AdmisionComponent,
        OfertasLaboralesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkScrollableModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTooltipModule
    ]
})
export class AdmisionModule {
}
