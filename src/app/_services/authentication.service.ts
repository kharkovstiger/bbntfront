import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, AuthResponse} from '../_models';
import {Config} from '../../config/config';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  // noinspection JSAnnotator
  doLogin(login: string, code: string) {
    this.http.post<AuthResponse>(Config.baseUrl + '/auth', {login, code})
      .subscribe(
        response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['countries']);
      },
        error => {
          console.log(error);
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        });
  }
}

