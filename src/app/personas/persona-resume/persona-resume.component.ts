import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select, _STORE_REDUCERS } from '@ngrx/store';

import { Persona } from '../models/persona';
import { PagoPost } from '../models/pago';
import { IAppState } from 'src/app/store/app.state';
import { selectSelectedPersona, selectPagoPostSuccess, selectErrors } from '../store/persona.selectors';
import { FindPersona, PostPago, PagoEnd, DeletePago, GetPersona } from '../store/persona.actions';
import { Concepto } from '../models/concepto';
import { GetConceptos } from '../store/concepto.actions';
import { selectConceptoList } from '../store/concepto.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';


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
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.persona = this._store.pipe(select(selectSelectedPersona));

    this._store.pipe(select(selectPagoPostSuccess)).subscribe(ok => {
      if (ok) {
        this._store.dispatch(new GetPersona({ personaId: this.personaId }));
        this._store.dispatch(new PagoEnd);
      }
    });

    this._store.pipe(select(selectErrors)).subscribe(err => {
      if (err != null) {
        alert(err);
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.personaId = parseInt(params['id'], 10);
      this._store.dispatch(new FindPersona({ personaId: this.personaId }));
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PersonaResumeDialogComponent, {
      width: '250px',
      data: { personaId: this.personaId.toString() }
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
}

@Component({
  selector: 'app-persona-resume-dialog',
  templateUrl: './persona-resume-dialog.component.html',
})
export class PersonaResumeDialogComponent implements OnInit {

  pagoFormGroup: FormGroup;
  obsConceptos: Observable<Concepto[]>;
  conceptos: Concepto[];
  cuotas: number[];
  personaId: number;


  constructor(
    public dialogRef: MatDialogRef<PersonaResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPago,
    private _store: Store<IAppState>) { }

  ngOnInit() {

    this.obsConceptos = this._store.pipe(select(selectConceptoList));

    this._store.dispatch(new GetConceptos());

    this.initForm();

  }

  private initForm() {
    let concepto: Concepto;
    let cuota = 1;

    this.pagoFormGroup = new FormGroup({
      'selectConcepto': new FormControl(concepto, Validators.required),
      'cuota': new FormControl(cuota, Validators.required),
      'valor': new FormControl({ value: 0, disabled: true })
    });

    this.pagoFormGroup.get('selectConcepto')
      .valueChanges
      .subscribe((cpto) => {
        cuota = 1;
        this.cuotas = this.getCuotas(cpto.cuotas);
        console.log(this.cuotas);
        this.pagoFormGroup.get('cuota').setValue(cuota);
        this.pagoFormGroup.get('valor').setValue(cpto.valor);
      });

    this.obsConceptos.subscribe((cptos) => {
      this.conceptos = cptos;
      concepto = cptos[0];
      this.pagoFormGroup.get('selectConcepto').setValue(concepto);
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
