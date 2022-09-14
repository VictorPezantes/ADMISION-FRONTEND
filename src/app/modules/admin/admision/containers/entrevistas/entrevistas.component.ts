import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdmisionService} from '../../admision.service';
import {MatPaginator} from '@angular/material/paginator';
import {Oferta} from '../../admision.interface';
import {BehaviorSubject, merge, Subject, switchMap} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {PostulacionesService} from '../postulaciones/postulaciones.service';
import {FormUtils} from '../../../../../shared/utils/form.utils';
import {Postulante} from '../../admision.interface';


@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.scss']
})
export class EntrevistasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Postulante[] = [];
  displayedColumns: string[] = ['imagen', 'informacion', 'responsable', 'estado', 'actions'];

  count = 0;

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
      private _ngxSpinner: NgxSpinnerService,
      private _messageProviderService: MessageProviderService,
      private _postulacionService: PostulacionesService,
      private _admisionService: AdmisionService,
  ) {
    this._admisionService.title.next('Entrevistas');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.paginator._intl.itemsPerPageLabel = 'Items por página.';

    this.initPagination();
  }

  initPagination(): void {
    merge(this.paginator.page, this.changesSubject, this._postulacionService.eventFilters)
        .pipe(
            switchMap(() => {
              this._ngxSpinner.show();
              const rawValue = this._postulacionService.eventFilters.value;
              const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
              const queryParamsByPaginator = {...filters} as any;
              queryParamsByPaginator.limit = this.paginator.pageSize;
              queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
              return this._postulacionService.get(queryParamsByPaginator);
            })
        ).subscribe((response) => {
      this._ngxSpinner.hide();
      this.count = response.count;
      this.dataSource = response.content;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
