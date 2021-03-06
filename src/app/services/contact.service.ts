import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class ContactService {

  endpoint = 'https://peddleservice.herokuapp.com';

  constructor(private http: HttpClient) { }

  public addcontact(contact){
    return this.http.post(this.endpoint+'/savecontact', contact);
  }
  public updatecontact(contact){
    return this.http.post(this.endpoint+'/updatecontact', contact);
  }
  public deletecontact(contact){
    return this.http.post(this.endpoint+'/deletecontact', contact);
  }
  public listcontacts(contact){
    return this.http.post(this.endpoint+'/listcontacts', contact);
  }
}
