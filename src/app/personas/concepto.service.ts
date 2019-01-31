import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concepto } from './models/concepto';


function conceptosSubscriber (observer) {
    const c1: Concepto = {
        id: 1,
        nombre: 'Pago Inicial',
        cuotas: 1,
        valor: 300
    };

    const c2: Concepto = {
        id: 2,
        nombre: 'Cuota 10',
        cuotas: 10,
        valor: 100
    };

    const conceptos: Concepto[] = [ c1, c2 ];

    observer.next(conceptos);

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return {unsubscribe() {}};

}

@Injectable()
export class ConceptoService {

    getConceptos(): Observable<Concepto[]> {
        return new Observable(conceptosSubscriber);
    }
}
