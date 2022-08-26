import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantFiltersComponent } from './postulant-filters.component';

describe('PostulantFiltersComponent', () => {
  let component: PostulantFiltersComponent;
  let fixture: ComponentFixture<PostulantFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulantFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulantFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
