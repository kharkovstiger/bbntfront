import { Component } from '@angular/core';
import {User} from './_models';
import {AuthenticationService, CountriesService} from './_services';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;
  currentCountry: string;
  private login: string;
  private code: string;

  constructor(private authenticationService: AuthenticationService, private countryService: CountriesService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.countryService.currentCountry.subscribe(x => this.currentCountry = x);
  }

  logout() {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.doLogin(this.login, this.code);
  }
}
