import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class FacebookService {

  endpoint = 'https://peddleservice.herokuapp.com';

  constructor(private http: HttpClient) { }

  existfacebookaccount(peddle_user){
    return this.http.post(this.endpoint+'/existfacebookaccount',peddle_user);
  }
}
