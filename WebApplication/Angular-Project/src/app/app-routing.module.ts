import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RegisterFormOneComponent} from './register-form-one/register-form-one.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: RegisterFormOneComponent },
  {path: 'about', component: AboutComponent },
  {path:'contact', component: ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegisterFormOneComponent];
