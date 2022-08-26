import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MessageProviderService {

  constructor(
      public dialog: MatDialog,
  ) {
  }

  showModal(component, config): MatDialogRef<any> {
    return this.dialog.open(component, config);
  }

  showModalPromise(component, dialogData, width?, disableClose?): any {
    return this.dialog.open(component, {
      width: (width ? width : '800px'),
      disableClose: (disableClose ? disableClose : false), data: dialogData
    }).afterClosed().toPromise();
  }
}
