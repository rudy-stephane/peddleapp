import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class LinkedinService {

  endpoint = 'http://localhost:5000';

  endpointaccesslinkedIn = 'https://www.linkedin.com/oauth/v2/accessToken';
  response_type = 'code';
  client_id='77b17box86iq9n';
  redirect_uri='http://localhost:4200/brandambassador';
  scope='r_emailaddress r_liteprofile w_member_social';

  constructor(private http: HttpClient) { }

  linkedinsignin(){
    /*return this.http.get('https://www.linkedin.com/oauth/v2/authorization?' +
      'response_type=' + this.response_type+
      '&client_id=' + this.client_id+
      '&redirect_uri=' + this.redirect_uri+
      '&scope='+this.scope);*/
    return this.http.get('https://www.linkedin.com/oauth/v2/authorization?' +
      'response_type=' + this.response_type+
      '&client_id=' + this.client_id+
      '&redirect_uri=' + this.redirect_uri+
      '&scope='+this.scope);
  }

  getclienttoken(obj){
    return this.http.post(this.endpointaccesslinkedIn,obj);
  }
  storeclienttoken(token){
    return this.http.post(this.endpoint+'/updateuser',token);
  }

  login(peddle_user_login){
    return this.http.post(this.endpoint+'/login',peddle_user_login);
  }
}
