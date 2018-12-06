import {CountriesService} from '../../_services';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'countries.component.html',
  styleUrls: ['countries.component.css']
})

export class CountriesComponent {

  private countries: string[] = [];

  constructor(private countriesService: CountriesService){}

  ngOnInit(){
    this.countriesService.getCounties().subscribe(c => this.countries=c);
  }

  choose(country: string) {
    this.countriesService.chooseCountry(country);
  }
}
