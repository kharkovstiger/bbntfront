import {Component} from "@angular/core";
import {User} from "../../_models";
import {AuthenticationService, CountriesService, UserService} from "../../_services";

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  currentUser: User;
  ntRoleName: string;
  private readonly ntRole: string;
  country: string;
  countries: string[];
  u21: boolean;

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
              private countryService: CountriesService){
    this.getCurrentUser();
    if (this.currentUser.roleCountry!=null){
      this.ntRole=this.currentUser.roles.find(r => r.includes('NT'));
      this.ntRoleName=this.currentUser.roleCountry + ' ' + this.ntRole.substring(5);
    }
    this.countryService.getCounties().subscribe(c => this.countries=c);
  }

  add(){
    this.userService.changeRoleRequest(this.country, 'ROLE_' + (this.u21?'U21':'') + 'NT');
    this.getCurrentUser();
  }

  delete(){
    this.userService.changeRoleRequest(this.currentUser.roleCountry, this.ntRole);
    this.getCurrentUser();
  }

  save(){
    console.log('saving...');
    this.userService.update(this.currentUser);
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }
}
