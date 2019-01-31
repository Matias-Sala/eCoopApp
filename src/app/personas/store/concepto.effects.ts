import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';

import { EConceptoActions, GetConceptosSuccess } from './concepto.actions';
import { ConceptoService } from '../concepto.service';
import { IAppState } from 'src/app/store/app.state';


@Injectable()
export class ConceptoEffects {

    @Effect()
    getConceptos$ = this._actions$.pipe(
        ofType(EConceptoActions.GetConceptos),
        switchMap(() =>
            this._conceptoService.getConceptos().pipe(
                map(data => (new GetConceptosSuccess(data)))
            ))
    );


    constructor(
        private _conceptoService: ConceptoService,
        private _actions$: Actions,
        private _store: Store<IAppState>
        ) {}
}

