import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmisionService {

  title: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }
}
