import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LinkedinService} from '../services/linkedin.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import {TwitterService} from '../services/twitter.service';
import {FacebookService} from '../services/facebook.service';
import * as fire from 'firebase';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-teammanagement',
  templateUrl: './teammanagement.component.html',
  styleUrls: ['./teammanagement.component.css'],
  providers: [MessageService]
})
// tslint:disable
export class TeammanagementComponent implements OnInit {

  peddle_social = [{peddle_social_name:'LinkedIn',peddle_social_stream:['post','scheduled']},{peddle_social_name:'FaceBook',peddle_social_stream:['post','page','mentions','scheduled']},{peddle_social_name:'Twitter',peddle_social_stream:['tweet','page','scheduled']}]
  social_input = new FormControl('LinkedIn');

  urllink = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77b17box86iq9n&redirect_uri=https://peddleapp.herokuapp.com/brandambassador&scope=r_emailaddress r_basicprofile w_member_social r_organization_social r_1st_connections_size rw_organization_admin w_member_social w_organization_social';

  /*calendarPlugins = [dayGridPlugin]*/
  display: boolean = false;
  displaypost:boolean = false;
  displaypin:boolean = false;
  displaystory:boolean = false;
  displaypeddleteamcreate:boolean = false;

  boolspinnersteam = false ;

  closeResult = '';

  grant_type = 'authorization_code';
  redirect_uri = 'https://peddleapp.herokuapp.com/brandambassador';
  client_id = '77b17box86iq9n';
  client_secret ='k6dMPUNP18aQULgY';
  user_profile = '';
  user_name = '';
  user_plan='';

  peddle_team_management = new FormControl('');
  peddle_team_name = new FormControl('',[Validators.required,Validators.minLength(4)]);
  peddle_team_description = new FormControl('',[Validators.required,Validators.minLength(4)]);
  listofteams=[];
  listofteamsmember=[];

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService, private teamService: TeamService) { }

  ngOnInit(): void {

    //this.activatedRoute.queryParams.
    //adding fields parameters

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.user_profile = peddle_user.peddle_user_profile;
    this.user_name = peddle_user.peddle_user_name;
    this.user_plan = peddle_user.peddle_user_plan;


    this.activatedRoute.queryParams.subscribe(params => {
      if("code" in params){
        let peddle_access={
          peddle_user_email:peddle_user_email,
          code: params['code'],
        };
        this.linkedinService.sendcode(peddle_access).subscribe(result=>{

          if (result == true){
            this.messageService.add({key: 'linkedinaccount', severity:'success', summary: 'Account', detail: 'your LinkedIn Account have been added'});
          }

        })
      }

    });

    /*var peddle_user_request = {
      peddle_user_email : peddle_user.peddle_user_email
    }

    this.teamService.gettinglistteam(peddle_user_request).subscribe(peddle_list_result=>{
      let resultat  = peddle_list_result as [any];
      this.listofteams = resultat;
    })*/

  }

  gettingteammember(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    var peddle_teammember_request = {
      peddle_user_email : peddle_user_email,
      peddle_team_name : this.peddle_team_management
    };

    this.teamService.getteammember(peddle_teammember_request).subscribe(teammember_result=>{
      let peddle_teammember_result = teammember_result as [any];
      this.listofteamsmember = peddle_teammember_result;
    })
  }

  SigninwithFacebook(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      //adding variable
      var data = {
        peddle_user_email:peddle_user_email,
        facebook_user_token: x.authToken,
        facebook_user_id: x.id
      };
      this.linkedinService.savefacebookaccount(data).subscribe(res=>{
        this.messageService.add({key: 'facebooksaved', severity:'success', summary: 'Account', detail: 'Facebook and Instagram account Saved'});
      });

    });
  }

  SigninwithTwitter(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    return this.afAuth.signInWithPopup(new fire.default.auth.TwitterAuthProvider())
      .then((result) => {

        let twitterusr = result as any;
        console.log('You have been successfully logged in!')
        //console.log(twitterusr);
        var data = {
          peddle_user_email:peddle_user_email,
          twitter_user_token: twitterusr.credential.accessToken,
          twitter_user_id: twitterusr.additionalUserInfo.profile.id
        };
        this.twitterservice.savetwitteraccount(data).subscribe(res=>{
          console.log(twitterusr.additionalUserInfo.profile.id);
          console.log(twitterusr.additionalUserInfo.profile.profile_image_url);
          console.log(twitterusr.credential.accessToken);
          this.messageService.add({key: 'twitteraccount', severity:'success', summary: 'Account', detail: 'your Twitter Account have been added'});
          this.display=false;
        });
      }).catch((error) => {
        console.log(error)
      })
  }


  existlinkedinaccount(){
    let existLinkedin = true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.linkedinService.existlinkedinaccount(peddle_user_email).subscribe(result=>{
      if (result == true){
        existLinkedin = true;
      }else{
        existLinkedin = false;
      }
    });
    return existLinkedin;
  }

  existtwitteraccount(){
    let existTwitter= true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.twitterservice.existtwitteraccount(peddle_user_email).subscribe(result=>{
      if (result == true){
        existTwitter = true;
      }else{
        existTwitter = false;
      }
    });
    return existTwitter;
  }

  existfacebookaccount(){
    let existFacebook= true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.facebookservice.existfacebookaccount(peddle_user_email).subscribe(result=>{
      if (result == true){
        existFacebook = true;
      }else{
        existFacebook = false;
      }
    });
    return existFacebook;
  }



  onclicklinkedin(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    console.log(peddle_user_email);
    this.linkedinService.linkedinsignin().subscribe(res=>{
      let resultat = res as any;
      let code = resultat.code;
      //let state = resultat.state;
      console.log('code  :  '+ code);
      let peddle_access={
        grant_type : this.grant_type,
        code: code,
        redirect_uri:this.redirect_uri,
        client_id: this.client_id,
        client_secret : this.client_secret
      };

      this.linkedinService.getclienttoken(peddle_access).subscribe(result=>{
        let reponse = result as any ;
        let access_token = reponse.access_token;
        console.log('################################');
        console.log('################################');
        console.log('access_token  :   '+ access_token);
        console.log('################################');
        console.log('################################');

        let user_linkedintoken = {
          peddle_user_email : peddle_user_email,
          access_token:access_token
        };
        this.linkedinService.storeclienttoken(user_linkedintoken).subscribe(restoken=>{
          this.display = false;
        })
      })
      //console.log(res)
    })
  }

  removecolumn(gtr){
    console.log(gtr.currentTarget);
  }

  checkpeddlename(){
    let check = false ;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var data = {
      peddle_team_name : this.peddle_team_name.value,
      peddle_user_email : peddle_user_email
    };
    this.teamService.existteamname(data).subscribe(res=>{
      if(res == true){
        check = true;
      }else{
        check = false;
      }
    });

    return check ;
  }

  addteam(){
    this.boolspinnersteam = true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    if(!this.checkpeddlename()&&this.peddle_team_name.valid && this.peddle_team_description)
    var peddle_team = {
      peddle_team_name : this.peddle_team_name.value,
      peddle_team_description : this.peddle_team_description.value,
      peddle_user_email : peddle_user_email
    };

    this.teamService.saveteam(peddle_team).subscribe(result=>{
      this.messageService.add({key: 'streamadded', severity:'success', summary: 'Save team', detail: 'New team is Saved'});
      this.boolspinnersteam = false;
    },err=>{
      this.messageService.add({key: 'streamadded', severity:'error', summary: 'Save team', detail: 'server error : your team are not saved'});
      this.boolspinnersteam = false;
    })

  }


  code = 'AQRjikE7Rc8-p3DIuwnqBV6dHpcWJQHTTfw-sWj9WIUFRcLI9c85usUjPVLA3zv48yTg3GqIIgXfEmyAB1C5XEj1bKgoGZJ62JLFwE6j2wze1BXHAPSSiQq34tqj5ElrBg7D53ecb8NOtdxdMih2pQJBk9BT7lymJmdQBp_lvaeCt_xYPWZFQXa9LyuHAw';

  ongettoken(){
    /*let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;*/
    let peddle_access={
      grant_type : this.grant_type,
      code: this.code,
      redirect_uri:this.redirect_uri,
      client_id: this.client_id,
      client_secret : this.client_secret
    };
    this.linkedinService.getclienttoken(peddle_access).subscribe(result=>{
      let reponse = result as any ;
      let access_token = reponse.access_token;
      console.log('access_token  :   '+ access_token);
      /*let user_linkedintoken = {
        peddle_user_email : peddle_user_email,
        access_token:access_token
      };
      this.linkedinService.storeclienttoken(user_linkedintoken).subscribe(restoken=>{
        this.display = false;
      })*/
    })
  }

  onclicktwitter(){

  }




  showDialog() {
    this.display = true;
  }
  showDialogPost(){
    this.displaypost = true;
  }
  showDialogPin(){
    this.displaypin = true;
  }
  showDialogstory(){
    this.displaystory= true;
  }
  showdisplaypeddleteamcreate(){
    this.displaypeddleteamcreate = true;
  }
  onHideDialogPost(){
    this.displaypost = false;
  }
  onHideDialogPin(){
    this.displaypin = false;
  }
  onHideDialogstory(){
    this.displaystory= false;
  }
  onHide(){
    this.display = false;
  }
  onHidedisplaypeddleteamcreate(){
    this.displaypeddleteamcreate = false;
  }
  peddle_stream_list = this.peddle_social[0].peddle_social_stream;
  socialchange(){
    console.log(this.social_input.value);
    for(let i=0;i<this.peddle_social.length;i++){
      if(this.social_input.value == this.peddle_social[i].peddle_social_name){
        this.peddle_stream_list = this.peddle_social[i].peddle_social_stream;
        break;
      }
    }
    console.log(this.peddle_stream_list);
  }


  profilesetting(){
    this.router.navigate(['profilesetting']);
  }

  /**
   * Methode pour le modal
   * @param content
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}