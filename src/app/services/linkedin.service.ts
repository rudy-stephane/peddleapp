import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


// tslint:disable
export class LinkedinService {

  endpoint = 'https://peddleservice.herokuapp.com';//'http://localhost:5000';

  endpointaccesslinkedIn = 'https://www.linkedin.com/oauth/v2/accessToken';
  response_type = 'code';
  client_id='77b17box86iq9n';
  redirect_uri='https://peddleapp.herokuapp.com/brandambassador';
  scope='r_emailaddress r_liteprofile w_member_social';


 /* optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };*/



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

  sendcode(peddle_user_code){
    return this.http.post(this.endpoint+'/sendcode',peddle_user_code);
  }

  existlinkedinaccount(peddle_user){
    return this.http.post(this.endpoint+'/existlinkedinaccount',peddle_user);
  }

  searchlinkedincompagnies(peddle_user){
    return this.http.post(this.endpoint+'/searchlinkedincompagnies',peddle_user);
  }

  alreadyexistlinkedincompagnie(linkedin_user_compagnies){
    return this.http.post(this.endpoint+'/alreadyexistlinkedincompagnie',linkedin_user_compagnies);
  }
  addinglinkedincompagnies(company){
    return this.http.post(this.endpoint+'/addinglinkedincompagnies',company);
  }

  gettinglinkedinliststream(peddle_user){
    return this.http.post(this.endpoint+'/gettinglinkedinliststream',peddle_user);
  }

  gettinglinkedinactivities(lkdactivities){
    return this.http.post(this.endpoint+'/linkedinactivities',lkdactivities);
  }

  postsimpletexttolinkedinonpersonalprofile(linkedinpost){
    return this.http.post(this.endpoint+'/postsimpletexttolinkedinonpersonalprofile',linkedinpost);
  }

}
