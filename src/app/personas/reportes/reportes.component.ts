import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoRealizado } from '../models/pago-realizado';
import { IAppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { selectPagoRealizadoList } from '../store/persona.selectors';
import { GetPagosRealizados } from '../store/persona.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  pagos$: PagoRealizado[];

  constructor(private _store: Store<IAppState>,
    private location: Location) { }

  ngOnInit() {
    console.log('INICIAR');

    this._store
      .pipe(select(selectPagoRealizadoList))
      .subscribe(p => this.pagos$ = p);

    this._store.dispatch(new GetPagosRealizados());
  }

  backToPrevious() {
    this.location.back();
  }
}


