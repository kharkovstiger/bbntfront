import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {Config} from "../../config/config";
import {Player} from "../_models";

@Injectable({ providedIn: 'root' })
export class PlayerService {

  private url:string='/player';

  constructor(private http: HttpService, private router: Router){}

  getTeamPlayers(){
    // return this.http.get<Player[]>(Config.baseUrl + this.url + '/playersForCurrentCountry', true);
    return this.http.get<Player[]>(Config.baseUrl + this.url + '/players', true);
  }

  addPlayer(playerId: string) {
    return this.http.put(Config.baseUrl + this.url + '/add/' + playerId, null, true);
  }

  getNTPlayers() {
    return this.http.get<Player[]>(Config.baseUrl + this.url + '/get', true);
  }
}
