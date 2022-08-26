import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusOffers'
})
export class StatusOffersPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Aprobada';
      case 3:
        return 'Rechazada';
      default:
        return 'Pendiente';
    }
  }

}
