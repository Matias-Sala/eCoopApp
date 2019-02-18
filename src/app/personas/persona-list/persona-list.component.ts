import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from 'src/app/store/app.state';
import { selectPersonaList } from '../store/persona.selectors';
import { GetPersonas } from '../store/persona.actions';
import { Persona } from '../models/persona';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonaListComponent implements OnInit, OnDestroy {

  titulo = 'Padres';
  personasFiltered: Observable<Persona[]>;
  subscription: Subscription;
  @Input() index: number;

  personas$: Observable<Persona[]>;
  filled: boolean;
  value = '';
  showSearch = false;

  constructor(private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {

    this.personas$ = this._store.pipe(select(selectPersonaList));
    this._store.dispatch(new GetPersonas());
    this.index = 1;
    this.personasFiltered = this.personas$;
  }

  ngOnDestroy(): void {

  }

  onResumePersona(id: number) {
    this._router.navigate(['resumen/' + id], { relativeTo: this._route });
  }

  filterPersons() {
    this.personasFiltered = this.personas$.pipe(
      map(people => people.filter(person => {
        const dir = (person.direccion == null) ? '' : person.direccion.calle + person.direccion.numero + person.direccion.dpto;
        return (person.nombre + person.apellido + dir).toLowerCase().match(this.value.toLowerCase());
      })
      )
    );
  }

  addSocio() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }
}
