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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// tslint:disable
export class HomeComponent implements OnInit {

  user_name = '';
  user_email = '';
  peddle_dashboard_record =[];

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService, private dashboardservice: DashboardService) { }

  ngOnInit(): void {
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    this.user_name = peddle_user.peddle_user_name;
    let peddle_user_email = peddle_user.peddle_user_email;
    this.user_email = peddle_user_email;
    var user_dashboard = {
      peddle_user_email:peddle_user_email
    };
    this.dashboardservice.gettingdashboard(user_dashboard).subscribe(resdash=>{
      this.peddle_dashboard_record = resdash as [];
      /*console.log(resdash);

      console.log(this.peddle_dashboard_record);
      console.log(this.peddle_dashboard_record.length);*/
    })
  }



}
