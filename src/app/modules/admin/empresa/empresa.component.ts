import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  availableColors: any[] = [
    {name: 'Honestidad', color: 'primary'},
    {name: 'Responsabilidad', color: 'primary'},
    {name: 'Profesionalismo', color: 'primary'},
    {name: 'Trabajo duro', color: 'primary'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
