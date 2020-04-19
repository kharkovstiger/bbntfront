import { Component } from '@angular/core';
import {User} from './_models';
import {AuthenticationService, CountriesService, PlayerService} from './_services';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;
  currentCountry: string;
  countries: string[];
  private login: string;
  private code: string;

  constructor(private authenticationService: AuthenticationService, private countryService: CountriesService,
              private playerService: PlayerService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.countryService.currentCountry.subscribe(x => this.currentCountry = x);
    this.countryService.getCounties().subscribe(c => this.countries=c);
  }

  logout() {
    this.authenticationService.logout();
    this.countryService.resetCurrentCountry();
  }

  doLogin() {
    this.authenticationService.doLogin(this.login, this.code);
  }

  chooseCountry(){
    this.countryService.chooseCountry(this.currentCountry);
  }

  updateNTSquad(){
    this.playerService.updateNTSquad();
  }

  addPostPopup() {

  }
}
