import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LinkedinService} from '../services/linkedin.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import {MessageService} from 'primeng/api';
import {TwitterService} from '../services/twitter.service';
import {FacebookService} from '../services/facebook.service';
import {DashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-peddle-home',
  templateUrl: './peddle-home.component.html',
  styleUrls: ['./peddle-home.component.css'],
  providers: [MessageService]
})

// tslint:disable
export class PeddleHomeComponent implements OnInit {

  public socialNetworkCollapsed = false;

  user_profile = 'assets/information.png';
  user_name = '';
  user_plan='';
  user_email = '';

  peddle_dashboard_record =[];

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService, private dashboardservice: DashboardService) { }

  ngOnInit(): void {

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.user_profile = peddle_user.peddle_user_profile;
    this.user_name = peddle_user.peddle_user_name;
    this.user_plan = peddle_user.peddle_user_plan;
    this.user_email = peddle_user_email;


  }

  booladdsocialnetwork = false;
  showdialogaddsocialnetwork(){
    this.booladdsocialnetwork = true;
  }

  /**
   * ajouter son compte facebook à l'application
   * @constructor
   */

  SigninwithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      var data = {
        peddle_user_email:this.user_email,
        facebook_user_token: x.authToken,
        facebook_user_id: x.id
      };
      this.facebookservice.savefacebookaccount(data).subscribe(res=>{
        this.messageService.add({key: 'facebooksaved', severity:'success', summary: 'Account', detail: 'Facebook and Instagram account Saved'});
      });
    });
  }

}
