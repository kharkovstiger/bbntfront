import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../_models";
import {Config} from "../../config/config";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class UserService {

  private url: string = '/user';

  constructor(private http: HttpService, private router: Router) {
  }

  update(user: User) {
    console.log('in service');
    console.log(Config.baseUrl + this.url + '/update');
    this.http.put(Config.baseUrl + this.url + '/update', user, true)
      .subscribe(r => {
        this.me();
      });

  }

  changeRoleRequest(country: string, role: string) {
    this.http.post<User>(Config.baseUrl + this.url + '/role/' + role + '/request?country=' + country, null, true)
      .subscribe(r =>  {
        localStorage.setItem('currentUser', JSON.stringify(r));
      });
  }

  me() {
    this.http.get<User>(Config.baseUrl + this.url + '/me', true)
      .subscribe(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['profile'])
      })
  }
}
