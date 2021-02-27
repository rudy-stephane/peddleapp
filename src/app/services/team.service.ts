import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class TeamService {

  endpoint = 'https://peddleservice.herokuapp.com';//'http://localhost:5000';
  constructor(private http: HttpClient) { }

  existteamname(peddle_team_name){
    return this.http.post(this.endpoint+'/existteamname', peddle_team_name);
  }

  saveteam(peddle_team){
    return this.http.post(this.endpoint+'/saveteam', peddle_team);
  }

  gettinglistteam(peddlerequest){
    return this.http.post(this.endpoint+'/listteam', peddlerequest);
  }

  getteammember(peddleteammember){
    return this.http.post(this.endpoint+'/listteammember', peddleteammember)
  }

  addteammember(teammember){
    return this.http.post(this.endpoint+'/addteammember', teammember)
  }

  processingemail(stringemail:String){

    var res = stringemail.indexOf('@');
    var size = stringemail.length;
    return  stringemail.substring(res+1, size);
  }

}
