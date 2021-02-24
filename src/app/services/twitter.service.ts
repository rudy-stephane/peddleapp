import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import * as fire from 'firebase';
import auth from 'firebase';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

// tslint:disable
export class TwitterService {
  endpoint = 'https://peddleservice.herokuapp.com';

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) { }

  savetwitteraccount(peddle_twitter_account){
    return this.http.post(this.endpoint+'/savetwitteraccount',peddle_twitter_account);
  }
  existtwitteraccount(peddle_user){
    return this.http.post(this.endpoint+'/existtwitteraccount',peddle_user);
  }

 /* provider = new fire.default.auth.GoogleAuthProvider();
  credential = this.afAuth.signInWithPopup(this.provider);*/

  // Sign in with Twitter


  /*twitterAuth() {
    return this.AuthLogin(new fire.default.auth.TwitterAuthProvider());
  }*/


 /* AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        let twitterusr = result as any;
        console.log('You have been successfully logged in!')
        //console.log(twitterusr);
        console.log(twitterusr.additionalUserInfo.profile.id);
        console.log(twitterusr.additionalUserInfo.profile.profile_image_url);
        console.log(twitterusr.credential.accessToken);
        this.messageService.add({key: 'twitteraccount', severity:'success', summary: 'Account', detail: 'your Twitter Account have been added'});

      }).catch((error) => {
        console.log(error)
      })
  }*/


  /* callbackurl = 'https://peddleapp.herokuapp.com/brandambassador';
   twitterendpoint = 'api.twitter.com/oauth/request_token';



     oauth_nonce=this.generatestring(35);
     oauth_callback=this.callbackurl;
     oauth_signature_method='HMAC-SHA1';
     oauth_timestamp=this.generatetimestamp();
     oauth_consumer_key='oWtIVT9mkTZLVB0K0MYt8YfZk';
     oauth_signature='Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D';
     oauth_version=1.0;

   constructor(private http: HttpClient) { }


    getrequestoken(){

       var data = {
         oauth_nonce:this.oauth_nonce,
         oauth_callback:this.oauth_callback,
         oauth_signature_method:this.oauth_signature_method,
         oauth_timestamp:this.oauth_timestamp,
         oauth_consumer_key:this.oauth_consumer_key,
         oauth_signature:this.oauth_signature,
         oauth_version:this.oauth_version
       }
    }

   generatestring(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
   }

   generatetimestamp(){
     return new Date();
   }*/

}
