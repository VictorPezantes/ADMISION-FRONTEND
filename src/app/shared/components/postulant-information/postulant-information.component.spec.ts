import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantInformationComponent } from './postulant-information.component';

describe('PostulantInformationComponent', () => {
  let component: PostulantInformationComponent;
  let fixture: ComponentFixture<PostulantInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulantInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
