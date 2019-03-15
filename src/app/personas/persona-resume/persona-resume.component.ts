import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select, _STORE_REDUCERS } from '@ngrx/store';

import { Persona } from '../models/persona';
import { PagoPost } from '../models/pago';
import { IAppState } from 'src/app/store/app.state';
import { selectSelectedPersona, selectErrors, selectReloadPersona, selectPersona } from '../store/persona.selectors';
import { PostPago, DeletePago, GetPersona } from '../store/persona.actions';
import { Concepto } from '../models/concepto';
import { GetConceptos } from '../store/concepto.actions';
import { selectConceptoList } from '../store/concepto.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface DialogPago {
  personaId: number;
}

@Component({
  selector: 'app-persona-resume',
  templateUrl: './persona-resume.component.html',
  styleUrls: ['./persona-resume.component.css']
})
export class PersonaResumeComponent implements OnInit {

  persona: Observable<Persona>;
  personaId: number;
  pagoCreated: Observable<boolean>;
  errors: Observable<string>;

  constructor(private _store: Store<IAppState>,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {

    // this.persona = this._store.pipe(select(selectSelectedPersona));

    this._store.pipe(select(selectErrors)).subscribe(err => {
      if (err != null) {
      }
    });

    this._store.pipe(select(selectReloadPersona)).subscribe(reload => {
      if (reload) {
        this._store.dispatch(new GetPersona({ personaId: this.personaId }));
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.personaId = parseInt(params['id'], 10);
      this.persona = this._store.pipe(select(selectPersona(this.personaId)));
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PersonaResumeDialogComponent, {
      width: '250px',
      data: { personaId: this.personaId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      const pago: PagoPost = {
        conceptoId: result.value.selectConcepto.id,
        cuota: result.value.cuota,
        valor: result.get('valor').value
      };

      this._store.dispatch(new PostPago({ personaId: this.personaId, pago: pago }));

    });
  }

  backToPrevious() {
    this.location.back();
  }

  deletePago(id: number) {
    if (confirm('Esta seguro que quiere eliminar el pago?')) {
      this._store.dispatch(new DeletePago({ id: id, personaId: this.personaId }));
    }
  }

  editPersona() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  editFamiliar(id: number) {
    this.router.navigate(['padres/' + this.personaId + '/familiares/' + id]);
  }

  deleteFamiliar(id: number) {
    if (confirm('Esta seguro que quiere eliminar el pago?')) {
      // this._store.dispatch(new DeleteFamiliar({ id: id, personaId: this.personaId }));
    }
  }
}

@Component({
  selector: 'app-persona-resume-dialog',
  templateUrl: './persona-resume-dialog.component.html',
})
export class PersonaResumeDialogComponent implements OnInit {

  pagoFormGroup: FormGroup;
  conceptos: Concepto[];
  cuotas: number[];
  persona: Persona;
  concepto: Concepto;
  cuota = 1;

  constructor(
    public dialogRef: MatDialogRef<PersonaResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPago,
    private _store: Store<IAppState>) { }

  ngOnInit() {
    this._store.dispatch(new GetConceptos());
    this.initForm();
  }

  private initForm() {
    this.pagoFormGroup = new FormGroup({
      'selectConcepto': new FormControl(this.concepto, Validators.required),
      'cuota': new FormControl(this.cuota, Validators.required),
      'valor': new FormControl({ value: 0, disabled: true })
    });

    this.pagoFormGroup.get('selectConcepto')
      .valueChanges
      .subscribe((cpto) => {
        this.cuota = 1;
        this.cuotas = this.getCuotas(cpto.cuotas);
        this.pagoFormGroup.get('cuota').setValue(this.cuota);
        this.pagoFormGroup.get('valor').setValue(cpto.valor);
      });

    this._store.pipe(select(selectConceptoList)).subscribe((cptos) => {
      this.conceptos = cptos;
      this.concepto = cptos[0];
      this.pagoFormGroup.get('selectConcepto').setValue(this.concepto);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCuotas(cantidad: number): number[] {
    const ctas = [cantidad];
    for (let i = 0; i < cantidad; i++) {
      ctas[i] = i + 1;
    }
    return ctas;
  }
}
