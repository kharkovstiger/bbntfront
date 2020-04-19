import {Component} from '@angular/core';
import {User} from '../../_models';
import {CountriesService} from '../../_services';
import {Post} from '../../_models/post';

@Component({
  templateUrl: 'main.component.html'
})
export class MainComponent {

  private currentUser: User;
  private currentCountry: string;
  private posts: Post[];

  constructor(private countryService:CountriesService){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.countryService.currentCountry.subscribe(x => this.currentCountry = x);
  }

}
