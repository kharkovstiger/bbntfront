import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {Config} from "../../config/config";
import {Player} from "../_models";

@Injectable({ providedIn: 'root' })
export class PlayerService {

  private url:string='/player';

  constructor(private http: HttpService, private router: Router){}

  getTeamPlayers(country: string){
    return this.http.get<Player[]>(Config.baseUrl + this.url + '/playersForCurrentCountry?country=' + country, true);
  }

  addPlayer(playerId: string) {
    return this.http.put(Config.baseUrl + this.url + '/add/' + playerId, null, true);
  }

  deletePlayer(playerId: string) {
    return this.http.delete(Config.baseUrl + this.url + '/delete/' + playerId, true);
  }

  getNTPlayers() {
    return this.http.get<Player[]>(Config.baseUrl + this.url + '/get', true);
  }

  updateNTSquad() {
    this.http.get(Config.baseUrl + this.url + '/updateNT', true);
  }

  addBio(bio: string, id: string) {
    this.http.put(Config.baseUrl + this.url + '/addBio/' + id, {bio}, true);
  }
}
