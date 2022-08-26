import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderInformationComponent } from './slider-information.component';

describe('SliderInformationComponent', () => {
  let component: SliderInformationComponent;
  let fixture: ComponentFixture<SliderInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
