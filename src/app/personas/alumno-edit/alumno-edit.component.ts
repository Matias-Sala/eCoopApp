import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/store/app.state';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Direccion } from '../models/direccion';
import { PostPadre, GetPersonas, PostPersonaEnd, PutPadre, PutPadreSuccess, EPersonaActions } from '../store/persona.actions';
import { Observable, Subscription } from 'rxjs';
import { selectErrors, selectPersona, selectReloadPersonas, selectFamiliar } from '../store/persona.selectors';
import { ActivatedRoute, Params } from '@angular/router';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.component.html',
  styleUrls: ['./alumno-edit.component.css']
})
export class AlumnoEditComponent implements OnInit, OnDestroy {

  titulo = 'Agregar Alumno';
  personaFormGroup: FormGroup;
  personaCreated: Observable<boolean>;
  showProgress: boolean;
  isEdit: boolean;
  familiarId: number;
  id: number;
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
      const paramId = params['id'];
      const paramFamId = params['familiarId'];
      if (paramId != null && paramFamId != null) {
        this.titulo = 'Editar Alumno';
        this.id = parseInt(paramId, 10);
        this.familiarId = parseInt(paramFamId, 10);
        this.isEdit = true;
        this._store.pipe(select(selectFamiliar(this.id, this.familiarId)))
          .subscribe(p => {
            this.persona = p;
          });
      }
    });

    this.personaFormGroup = new FormGroup({
      'nombre': new FormControl(this.persona.nombre, Validators.required),
      'apellido': new FormControl(this.persona.apellido, Validators.required),
      'curso': new FormControl(this.persona.direccion.calle),
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
