import { Component, OnInit } from '@angular/core';
import {MessageProviderService} from '../../../../../shared/services/message-provider.service';
import {CreateOfferComponent} from '../create-offer/create-offer.component';
import {OfertasService} from '../../containers/ofertas/ofertas.service';

@Component({
  selector: 'app-offer-actions',
  templateUrl: './offer-actions.component.html',
  styleUrls: ['./offer-actions.component.scss']
})
export class OfferActionsComponent implements OnInit {

  constructor(
      private _offerService: OfertasService,
  ) { }

  ngOnInit(): void {
  }


  createOffer(): void {
    this._offerService.eventCreate.next();
  }

}
