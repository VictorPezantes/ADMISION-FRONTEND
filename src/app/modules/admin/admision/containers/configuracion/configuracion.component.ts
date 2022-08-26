import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdmisionService} from '../../admision.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit, AfterViewInit {

  constructor(
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Configuraciones');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
