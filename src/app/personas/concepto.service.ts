import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concepto } from './models/concepto';


function conceptosSubscriber (observer) {
    const c1: Concepto = {
        id: 4,
        nombre: 'Pago Inicial',
        cuotas: 1,
        valor: 500
    };

    const c2: Concepto = {
        id: 1,
        nombre: 'Pago en 10 Cuotas',
        cuotas: 10,
        valor: 150
    };

    const c3: Concepto = {
        id: 2,
        nombre: 'Pago Total',
        cuotas: 1,
        valor: 1000
    };

    const c4: Concepto = {
        id: 3,
        nombre: 'Pago en 3 Cuotas',
        cuotas: 3,
        valor: 400
    };

    const conceptos: Concepto[] = [ c1, c2, c3, c4 ];

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
