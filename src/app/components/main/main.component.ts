import {Component} from '@angular/core';
import {User} from '../../_models';

@Component({
  templateUrl: 'main.component.html'
})
export class MainComponent {

  private currentUser: User;

  constructor(){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }

}
