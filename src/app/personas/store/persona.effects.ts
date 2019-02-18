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
    GetPersonaSuccess,
    PostPadre,
    PostPadreSuccess,
    PutPadre,
    PutPadreSuccess
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
        ofType<GetPersona>(EPersonaActions.GetPersona),
        switchMap(getPersona =>
            this._personaService.getPadre(getPersona.payload.personaId).pipe(
                map(data => {
                    return (new GetPersonaSuccess({ persona: data }));
                }),
            )
        ));

    @Effect()
    postPadre$ = this._actions$.pipe(
        ofType<PostPadre>(EPersonaActions.PostPadre),
        switchMap(postPadre =>
            this._personaService.postPadre(postPadre.payload.padre).pipe(
                map(_ => new PostPadreSuccess()),
                catchError(err => of(new EffectError(err)))
            ))
    );

    @Effect()
    putPadre$ = this._actions$.pipe(
        ofType<PutPadre>(EPersonaActions.PutPadre),
        switchMap(putPadre =>
            this._personaService.putPadre(putPadre.payload.padre).pipe(
                map(() => new PutPadreSuccess({ padre: putPadre.payload.padre })),
                catchError(err => of(new EffectError(err)))
            )
        )
    );

    @Effect()
    postPago$ = this._actions$.pipe(
        ofType<PostPago>(EPersonaActions.PostPago),
        switchMap(postPago =>
            this._personaService.postPago(postPago.payload.personaId, postPago.payload.pago).pipe(
                map(_ => new PostPagoSuccess()),
                catchError(err => of(new EffectError(err)))
            )
        )
    );

    @Effect()
    deletePago$ = this._actions$.pipe(
        ofType<DeletePago>(EPersonaActions.DeletePago),
        switchMap(deletePago => this._personaService.deletePago(deletePago.payload.id, deletePago.payload.personaId).pipe(
            map(() => new DeletePagoSuccess({ id: deletePago.payload.personaId })),
            catchError(err => of(new EffectError(err)))
        )
        )
    );

    constructor(
        private _personaService: PersonaService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) { }
}
