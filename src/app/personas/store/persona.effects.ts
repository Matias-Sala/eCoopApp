import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom, mergeMap, catchError, take } from 'rxjs/operators';

import { IAppState } from 'src/app/store/app.state';
import {
    EPersonaActions,
    GetPersonasSuccess,
    PostPago,
    PostPagoSuccess,
    EffectError,
    DeletePago,
    DeletePagoSuccess,
    GetPersona,
    GetPersonaSuccess
} from './persona.actions';
import { PersonaService } from '../persona.service';
import { of, Observable } from 'rxjs';

@Injectable()
export class PersonaEffects {


    @Effect()
    getPersonas$ = this._actions$.pipe(
        ofType(EPersonaActions.GetPersonas),
        switchMap(() =>
            this._personaService.getPadres().pipe(
                take(10),
                map(data => {
                    return (new GetPersonasSuccess(data));
                }),
            )
        ));

    @Effect()
    getPersona$ = this._actions$.pipe(
        ofType(EPersonaActions.GetPersona),
        map((action: GetPersona) => action.payload),
        switchMap(payload =>
            this._personaService.getPadre(payload.personaId).pipe(
                map(data => {
                    return (new GetPersonaSuccess({ persona: data }));
                }),
            )
        ));

    @Effect()
    postPago$ = this._actions$.pipe(
        ofType(EPersonaActions.PostPago),
        map((action: PostPago) => action.payload),
        switchMap(payload =>
            this._personaService.postPago(payload.personaId, payload.pago).pipe(
                map(_ => new PostPagoSuccess()),
                catchError(err => of(new EffectError(err)))
            ))
    );

    @Effect()
    deletePago$ = this._actions$.pipe(
        ofType(EPersonaActions.DeletePago),
        map((action: DeletePago) => action.payload),
        switchMap(payload => this._personaService.deletePago(payload.id, payload.personaId).pipe(
            map(() => new DeletePagoSuccess({ id: payload.personaId })),
            catchError(err => of(new EffectError(err)))
        ))
    );

    constructor(
        private _personaService: PersonaService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) { }
}
