import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder} from '@angular/forms';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {PostulacionesService} from '../../containers/postulaciones/postulaciones.service';
import moment from 'moment';

@Component({
  selector: 'app-postulant-filters',
  templateUrl: './postulant-filters.component.html',
  styleUrls: ['./postulant-filters.component.scss']
})
export class PostulantFiltersComponent implements OnInit {

  formFilters: FormGroup;

  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
      private _fb: UntypedFormBuilder,
      private _postulantServices: PostulacionesService
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.formFilters.valueChanges
        .pipe(takeUntil(this.unsubscribe), debounceTime(500))
        .subscribe(value => {
          const parsedData = this.castToParams(value);
          this._postulantServices.eventFilters.next(parsedData);
        });
  }

  castToParams(filters) {
    return filters;
  }

  createFormFilters(): void {
    this.formFilters = this._fb.group({
      search: [''],
      status: [''],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
