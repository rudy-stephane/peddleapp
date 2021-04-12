import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
// tslint:disable
export class DashboardService {

  endpoint = 'https://peddleservice.herokuapp.com';

  constructor(private http: HttpClient) { }

  addstreamtodashboard(stream){
    return this.http.post(this.endpoint + '/addstreamtodashboard',stream);
  }

  gettingdashboard(peddle_user){
    return this.http.post(this.endpoint + '/gettingdashboard', peddle_user);
  }

  deletedashboarditem(dashboarditem){
    return this.http.post(this.endpoint + '/deletedashboarditem',dashboarditem);
  }

}
