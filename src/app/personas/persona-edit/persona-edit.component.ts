import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/store/app.state';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Direccion } from '../models/direccion';
import { PostPadre, GetPersonas, PostPersonaEnd, PutPadre, PutPadreSuccess, EPersonaActions } from '../store/persona.actions';
import { Observable, Subscription } from 'rxjs';
import { selectErrors, selectPersona, selectReloadPersonas } from '../store/persona.selectors';
import { ActivatedRoute, Params } from '@angular/router';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent implements OnInit, OnDestroy {

  titulo = 'Agregar Socio';
  personaFormGroup: FormGroup;
  personaCreated: Observable<boolean>;
  showProgress: boolean;
  isEdit: boolean;
  paramId: string;
  personaId: number;
  persona: Persona;
  subsc: Subscription;

  constructor(private _store: Store<IAppState>,
    private location: Location,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject) { }

  ngOnInit() {

    const direccion: Direccion = {
      calle: '',
      dpto: '',
      numero: 0
    };

    this.persona = {
      id: 0,
      familiares: null,
      pagos: null,
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: direccion
    };

    this.route.params.subscribe((params: Params) => {
      this.paramId = params['id'];
      if (this.paramId != null) {
        this.titulo = 'Editar Socio';
        this.personaId = parseInt(this.paramId, 10);
        this.isEdit = true;
        this._store.pipe(select(selectPersona(this.personaId)))
          .subscribe(p => {
            this.persona = p;
          });
      }
    });

    this.personaFormGroup = new FormGroup({
      'nombre': new FormControl(this.persona.nombre, Validators.required),
      'apellido': new FormControl(this.persona.apellido, Validators.required),
      'calle': new FormControl(this.persona.direccion.calle),
      'dpto': new FormControl(this.persona.direccion.dpto),
      'numero': new FormControl(this.persona.direccion.numero),
      'telefono': new FormControl(this.persona.telefono),
    });

    this._store.pipe(select(selectReloadPersonas)).subscribe(ok => {
      if (ok) {
        this._store.dispatch(new GetPersonas());
        this.backToPrevious();
      }
    });

    this._store.pipe(select(selectErrors)).subscribe(err => {
      if (err != null) {
        this.showProgress = false;
      }
    });

    this.subsc = this.actionsSubj.subscribe(data => {
      if (data.type === EPersonaActions.PutPadreSuccess) {
        this.backToPrevious();
      }
    });
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  backToPrevious() {
    this.location.back();
  }

  submit() {
    this.showProgress = true;

    this.persona.nombre = this.personaFormGroup.get('nombre').value;
    this.persona.apellido = this.personaFormGroup.get('apellido').value;
    this.persona.telefono = this.personaFormGroup.get('telefono').value;
    this.persona.direccion.calle = this.personaFormGroup.get('calle').value;
    this.persona.direccion.dpto = this.personaFormGroup.get('dpto').value;
    this.persona.direccion.numero = this.personaFormGroup.get('numero').value;

    if (this.isEdit) {
      this._store.dispatch(new PutPadre({ padre: this.persona }));
    } else {
      this._store.dispatch(new PostPadre({ padre: this.persona }));
    }
  }
}
