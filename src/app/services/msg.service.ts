import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class MsgService {

  endpoint = 'https://peddleservice.herokuapp.com';//'http://localhost:5000';
  constructor(private http: HttpClient) { }

  gettingpeddlemember(){
    return this.http.get(this.endpoint+'/peddle_list_member');
  }
}
