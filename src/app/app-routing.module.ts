import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent, CountriesComponent, MainComponent} from './components';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'main', component: MainComponent},

  // { path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
