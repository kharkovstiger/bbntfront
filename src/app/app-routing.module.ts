import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent, CountriesComponent, MainComponent, PlayersComponent} from './components';
import {ProfileComponent} from "./components/profile";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'main', component: MainComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'players/:type', component: PlayersComponent, runGuardsAndResolvers: "always"},

  // { path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
