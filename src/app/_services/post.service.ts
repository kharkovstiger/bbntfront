import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {Config} from '../../config/config';
import {Post} from '../_models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private url:string='/post';

  constructor(private http: HttpService, private router: Router){}

  getPosts(country: string){
    return this.http.get<Post[]>(Config.baseUrl + this.url + '/postsForCurrentCountry?country=' + country, true);
  }

  addPost(post: Post){
    return this.http.put(Config.baseUrl + this.url + '/add/post', post, true);
  }

  addComment(comment: Post, postId: string){
    return this.http.put(Config.baseUrl + this.url + '/add/comment/' + postId, comment, true);
  }
}
