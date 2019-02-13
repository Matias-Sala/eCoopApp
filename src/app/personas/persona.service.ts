import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Persona } from './models/persona';
import { Direccion } from './models/direccion';
import { Pago, PagoPost } from './models/pago';
import { baseUrl, handleError, httpOptions } from '../service.config';

function personasSubscriber(observer) {

    const d1: Direccion = {
        calle: 'La Rioja',
        dpto: '',
        numero: 614
    };

    const h1: Persona = {
        id: 3,
        nombre: 'Ezequiel',
        apellido: 'Sala',
        telefono: '',
        familiares: null,
        direccion: d1,
        pagos: null,
    };

    const h2: Persona = {
        id: 4,
        nombre: 'Sebastian',
        apellido: 'Sala',
        telefono: '',
        familiares: null,
        direccion: d1,
        pagos: null,
    };

    const hijos: Persona[] = [h1, h2];

    const pg1: Pago = {
        id: 1,
        concepto: 'Pago Inicial',
        cuota: 1,
        valor: 300,
        fecha: '13/03/2019'
    };

    const pg2: Pago = {
        id: 2,
        concepto: 'Cuota 10',
        cuota: 1,
        valor: 100,
        fecha: '13/03/2019'
    };

    const p1: Persona = {
        id: 1,
        nombre: 'Matias',
        apellido: 'Sala',
        telefono: '2352-501440',
        familiares: hijos,
        direccion: d1,
        pagos: [pg1, pg2],
    };

    const p2: Persona = {
        id: 2,
        nombre: 'Ivana',
        apellido: 'Dominguez',
        telefono: '2352-500836',
        familiares: hijos,
        direccion: d1,
        pagos: [pg1, pg2],
    };

    const personas: Persona[] = [p1, p2];

    observer.next(personas);

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return { unsubscribe() { } };
}

function httpMock(observer) {
    // observable execution
    observer.next('ok');
    return { unsubscribe() { } };
}

@Injectable()
export class PersonaService {

    personasUrl = baseUrl + '/people';

    constructor(private http: HttpClient) { }

    getPadres(): Observable<Persona[]> {
        const padresUrl = this.personasUrl + '/parent';
        return this.http.get<Persona[]>(padresUrl, httpOptions);
    }

    getPadre(id: number): Observable<Persona> {
        const padreUrl = this.personasUrl + '/' + id;
        return this.http.get<Persona>(padreUrl, httpOptions);
    }

    postPago(personaId: number, pago: PagoPost) {
        const pagoPostUrl = this.personasUrl + '/' + personaId + '/pagos';
        return this.http.post(pagoPostUrl, pago, httpOptions);
    }

    deletePago(id: number): Observable<number> {
        return new Observable(httpMock);
    }
}
