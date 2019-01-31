import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from 'src/app/store/app.state';
import { selectPersonaList } from '../store/persona.selectors';
import { GetPersonas, GetPersona } from '../store/persona.actions';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit, OnDestroy {

  titulo = 'Padres';
  personas: Persona [];
  subscription: Subscription;
  @Input() index: number;

  personas$: Observable<Persona[]>;
  filled: boolean;

  constructor(private _store: Store<IAppState>,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {

    this.personas$ = this._store.pipe(select(selectPersonaList));
    this._store.dispatch(new GetPersonas());
    this.index = 1;

  }

  ngOnDestroy(): void {

  }

  onResumePersona(index: number) {
    this._router.navigate(['resumen/' + index], {relativeTo: this._route});
  }
}
