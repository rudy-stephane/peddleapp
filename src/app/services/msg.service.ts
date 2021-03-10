import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class MsgService {

  private socket;
  endpoint = 'https://peddleservice.herokuapp.com';//'http://localhost:5000';
  constructor(private http: HttpClient) {
    // @ts-ignore
    this.socket = io(this.endpoint, { transport : ['websocket', 'polling', 'flashsocket'] });
  }

  gettingpeddlemember(){
    return this.http.get(this.endpoint+'/peddle_list_member');
  }

  public conectuser(message) {
    this.socket.emit('new user', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };

  public sendingMessage(message) {
    this.socket.emit('message', message);
  }

  getmessagelist(data){
    return this.http.post(this.endpoint+'/peddle_list_messages',data);
  }
}
