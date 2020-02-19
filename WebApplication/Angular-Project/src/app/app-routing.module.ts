import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RegisterFormComponent} from './register-form/register-form.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register-form', component: RegisterFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegisterFormComponent];
