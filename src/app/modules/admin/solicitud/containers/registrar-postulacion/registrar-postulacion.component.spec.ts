import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPostulacionComponent } from './registrar-postulacion.component';

describe('RegistrarPostulacionComponent', () => {
  let component: RegistrarPostulacionComponent;
  let fixture: ComponentFixture<RegistrarPostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPostulacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
