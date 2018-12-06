import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../config/config';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private url:string='/country';
  private currentCountrySubject: BehaviorSubject<string>;
  public currentCountry: Observable<string>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentCountrySubject = new BehaviorSubject<string>(localStorage.getItem('currentCountry'));
    this.currentCountry = this.currentCountrySubject.asObservable();
  }

  getCounties() {
    return this.http.get<string[]>(Config.baseUrl + this.url + '/get')
  }

  chooseCountry(country: string) {
    this.http.put(Config.baseUrl + this.url + '/choose/' + country, null)
      .subscribe(r => {
        localStorage.setItem('currentCountry', country);
        this.currentCountrySubject.next(country);
        this.router.navigate(['main']);
      });
  }
}
