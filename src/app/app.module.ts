import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { MaterialModule } from './material.module';
import { PersonaListComponent } from './personas/persona-list/persona-list.component';
import { PersonaService } from './personas/persona.service';
import { PersonaResumeComponent, PersonaResumeDialogComponent } from './personas/persona-resume/persona-resume.component';

import { appReducer } from './store/app.reducer';
import { PersonaEffects } from './personas/store/persona.effects';
import { ConceptoEffects } from './personas/store/concepto.effects';
import { ConceptoService } from './personas/concepto.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { LoginEffects } from './login/store/login.effects';
import { LoginService } from './login/login.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaListComponent,
    PersonaResumeComponent,
    PersonaResumeDialogComponent,
    LoginComponent
  ],
  entryComponents: [PersonaResumeComponent, PersonaResumeDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PersonaEffects, ConceptoEffects, LoginEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PersonaService,
    ConceptoService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
