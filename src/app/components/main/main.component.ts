import {Component} from '@angular/core';
import {User} from '../../_models';
import {CountriesService} from '../../_services';
import {Post} from '../../_models/post';
import {PostService} from '../../_services/post.service';

@Component({
  templateUrl: 'main.component.html'
})
export class MainComponent {

  private currentUser: User;
  currentCountry: string;
  posts: Post[];

  constructor(private countryService:CountriesService, private postService: PostService){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.countryService.currentCountry.subscribe(x => this.currentCountry = x);
  }
}
