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
import { selectSelectedPersona, selectPagoPostSuccess } from '../store/persona.selectors';
import { GetPersona, PostPago, PagoEnd, DeletePago } from '../store/persona.actions';
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

  constructor(private _store: Store<IAppState>,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.persona = this._store.pipe(select(selectSelectedPersona));

    this.route.params.subscribe((params: Params) => {
      this.personaId = params['id'];
      this._store.dispatch(new GetPersona(this.personaId));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PersonaResumeDialogComponent, {
      width: '250px',
      data: { personaId: this.personaId.toString() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  backToPrevious() {
    this.location.back();
  }

  deletePago(id: number) {
    if (confirm('Esta seguro que quiere eliminar el pago?')) {
      this._store.dispatch(new DeletePago(id));
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
  pagoCreated: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<PersonaResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPago,
    private _store: Store<IAppState>) { }

  ngOnInit() {

    this.obsConceptos = this._store.pipe(select(selectConceptoList));
    this.pagoCreated = this._store.pipe(select(selectPagoPostSuccess));

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

    this.pagoCreated.subscribe(ok => {
      if (ok) {
        this._store.dispatch(new PagoEnd);
        this.onNoClick();
      }
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

  onSubmit() {

    const pago: PagoPost = {
      conceptoId: this.pagoFormGroup.value.selectConcepto.id,
      cuota: this.pagoFormGroup.value.cuota,
      valor: this.pagoFormGroup.get('valor').value,
      personaId: this.data.personaId
    };

    this._store.dispatch(new PostPago(pago));
  }
}
