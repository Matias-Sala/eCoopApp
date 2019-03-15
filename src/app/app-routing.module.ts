import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { PersonaResumeComponent } from './personas/persona-resume/persona-resume.component';
import { PersonaListComponent } from './personas/persona-list/persona-list.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PersonaEditComponent } from './personas/persona-edit/persona-edit.component';
import { ReportesComponent } from './personas/reportes/reportes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'padres', component: PersonaListComponent, canActivate: [AuthGuard]},
  { path: 'padres/new', component: PersonaEditComponent, canActivate: [AuthGuard]},
  { path: 'padres/:id', component: PersonaResumeComponent, canActivate: [AuthGuard]},
  { path: 'padres/:id/edit', component: PersonaEditComponent, canActivate: [AuthGuard]},
  { path: 'reportes/cobranzas', component: ReportesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
