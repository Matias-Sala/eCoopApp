import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { PersonaResumeComponent } from './personas/persona-resume/persona-resume.component';
import { PersonaListComponent } from './personas/persona-list/persona-list.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'padres', component: PersonasComponent, canActivate: [AuthGuard], children: [
      { path: '', component: PersonaListComponent},
      { path: 'resumen/:id', component: PersonaResumeComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
