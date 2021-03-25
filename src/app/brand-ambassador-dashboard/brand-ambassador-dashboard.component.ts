import { Component, OnInit } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import {FormControl} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LinkedinService} from '../services/linkedin.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as fire from 'firebase';
/*import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';*/


import {SocialAuthService} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
// @ts-ignore
import { FacebookLoginProvider } from 'angularx-social-login';
import {MenuItem, MessageService} from 'primeng/api';
import {TwitterService} from '../services/twitter.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FacebookService} from '../services/facebook.service';

@Component({
  selector: 'app-brand-ambassador-dashboard',
  templateUrl: './brand-ambassador-dashboard.component.html',
  styleUrls: ['./brand-ambassador-dashboard.component.css'],
  providers: [MessageService]
})


// tslint:disable
export class BrandAmbassadorDashboardComponent implements OnInit {

  peddle_social = [{peddle_social_name:'LinkedIn',peddle_social_stream:['post','scheduled']},{peddle_social_name:'FaceBook',peddle_social_stream:['post','page','mentions','scheduled']},{peddle_social_name:'Twitter',peddle_social_stream:['tweet','page','scheduled']}]

  social_input = new FormControl('LinkedIn');

  urllink = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77b17box86iq9n&redirect_uri=https://peddleapp.herokuapp.com/brandambassador&scope=r_emailaddress r_basicprofile w_member_social r_organization_social r_1st_connections_size rw_organization_admin w_organization_social';

  /*calendarPlugins = [dayGridPlugin]*/
  display: boolean = false;
  displaypost:boolean = false;
  displaypin:boolean = false;
  displaystory:boolean = false;

  closeResult = '';

  grant_type = 'authorization_code';
  redirect_uri = 'https://peddleapp.herokuapp.com/brandambassador';
  client_id = '77b17box86iq9n';
  client_secret ='k6dMPUNP18aQULgY';
  user_profile = '';
  user_name = '';
  user_plan='';

  socialnetworks: MenuItem[]; // Gestion des différents reseaux sociaux

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService) { }

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

    this.socialnetworks = [
      {
        label : 'Facebook',
        icon : 'pi pi-fw pi-facebook',
        items : [
          {
            label : 'Personal account',
            icon : 'pi pi-fw pi-id-card',
            command : ()=> this.SigninwithFacebook(),
          },
          {
            label : 'Pages',
            icon : 'pi pi-fw pi-wallet'
          },
          {
            label : 'Groupes',
            icon : 'pi pi-fw pi-users'
          }
        ]
      },
      {
        label : 'Linkedin',
        icon : 'fa fa-linkedin-square',
        items : [
          {
            label : 'Personnal account',
            icon : 'fa fa-linkedin-square',
            command: ()=> window.location.href = this.urllink,
          },
          {
            label : 'Compagnies',
            icon : 'pi pi-fw pi-home',
            command: ()=> this.searchlinkedincompagnies(),
          }
        ]
      },
      {
        label : 'Twitter',
        icon : 'pi pi-fw pi-twitter',  //command : ()=> this.SigninwithTwitter(),
        items : [
          {
            label : 'personal account',
            icon : 'pi pi-fw pi-twitter',
            command : ()=> this.SigninwithTwitter()
          },
        ]
      },
      {
        label : 'Instagram',
        icon : 'fa fa-instagram',
        items : [
          {
            label : 'personal account',
            icon : 'fa fa-instagram',
          },
        ]
      }
    ];
  }

  searchlinkedincompagnies(){

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var user_email = {
      peddle_user_email:peddle_user_email
    };

    this.linkedinService.searchlinkedincompagnies(user_email).subscribe(compagnies_result=>{
      console.log('###################');
      console.log(compagnies_result);
      console.log('###################');
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

        /*console.log('############');
        console.log(result);
        console.log('############');
*/
        let twitterusr = result as any;
        console.log('You have been successfully logged in!')
        //console.log(twitterusr);
        var data = {
          peddle_user_email:peddle_user_email,
          twitter_user_token: twitterusr.credential.accessToken,
          twitter_user_id: twitterusr.additionalUserInfo.profile.id_str
        };
        this.twitterservice.savetwitteraccount(data).subscribe(res=>{
          /*console.log('############');
          console.log(twitterusr);
          console.log('############');*/
          console.log(twitterusr.additionalUserInfo.profile.id_str);
          console.log(twitterusr.additionalUserInfo.profile.profile_image_url);
          console.log(twitterusr.credential.accessToken);
          this.messageService.add({key: 'twitteraccount', severity:'success', summary: 'Account', detail: 'your Twitter Account have been added'});
          this.display=false;
        });
      }).catch((error) => {
        console.log(error)
      })
  }

  /*twitterAuth() {
    return this.twitterservice.AuthLogin(new fire.default.auth.TwitterAuthProvider());
  }*/


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
