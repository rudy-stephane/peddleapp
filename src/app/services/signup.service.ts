import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class SignupService {

  endpoint = 'https://peddleservice.herokuapp.com';//'http://localhost:5000';
  constructor(private http: HttpClient) { }

 signup(peddle_user_signup){
   return this.http.post(this.endpoint+'/signup',peddle_user_signup);
 }

 login(peddle_user_login){
    return this.http.post(this.endpoint+'/login',peddle_user_login);
 }

 corstest(){
    return this.http.get(this.endpoint+'/testcors');
 }

}
