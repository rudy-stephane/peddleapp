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
import {DashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-brand-ambassador-dashboard',
  templateUrl: './brand-ambassador-dashboard.component.html',
  styleUrls: ['./brand-ambassador-dashboard.component.css'],
  providers: [MessageService]
})


// tslint:disable
export class BrandAmbassadorDashboardComponent implements OnInit {

  //peddle_social = [{peddle_social_name:'LinkedIn',peddle_social_stream:['post','scheduled']},{peddle_social_name:'FaceBook',peddle_social_stream:['post','page','mentions','scheduled']},{peddle_social_name:'Twitter',peddle_social_stream:['tweet','page','scheduled']}]

  social_input = new FormControl('FaceBook');

  urllink = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77b17box86iq9n&redirect_uri=https://peddleapp.herokuapp.com/brandambassador&scope=r_emailaddress r_basicprofile w_member_social r_organization_social r_1st_connections_size rw_organization_admin w_organization_social';

  /*calendarPlugins = [dayGridPlugin]*/
  display: boolean = false;
  displaypost:boolean = false;
  displaypin:boolean = false;
  displaystory:boolean = false;
  displaylinkedincompany:boolean = false;

  closeResult = '';

  grant_type = 'authorization_code';
  redirect_uri = 'https://peddleapp.herokuapp.com/brandambassador';
  client_id = '77b17box86iq9n';
  client_secret ='k6dMPUNP18aQULgY';
  user_profile = '';
  user_name = '';
  user_plan='';

  socialnetworks: MenuItem[]; // Gestion des différents reseaux sociaux

  facebooklistflux = ['Activity','Mentions', 'Posts', 'Messages','scheduled'];
  linkedinlistsflux = ['Flux','posts','scheduled'];
  twitterlistsflux = ['Acceuil','Mentions', 'Mes Tweets', 'Retweets','scheduled'];
  instagramlistsflux = ['Posts', 'scheduled'];

  socialstreamlist = [];

  dboolchoosedashboard = false ;
  select_flux = new FormControl('');
  select_profil = new FormControl('');

  peddle_stream_list = [];

  peddle_dashboard_record = [];

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService, private dashboardservice: DashboardService) { }

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

    // on recupère les préférences de l'utilisateur

   this.gettingDashboardPreferences();
  }

  listedescompagnies = [];
  searchlinkedincompagnies(){
    this.displaylinkedincompany = true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var user_email = {
      peddle_user_email:peddle_user_email
    };

    this.linkedinService.searchlinkedincompagnies(user_email).subscribe(compagnies_result=>{
      let resultat = compagnies_result as [any];
      this.listedescompagnies = resultat;
      console.log('###################');
      console.log(compagnies_result);
      console.log('###################');
    })

  }


  addinglinkedincompagny(compagnie){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    var compagnierequest = {
      peddle_user_email : peddle_user_email,
      companyid: compagnie.companyid,
      companyurn: compagnie.companyurn,
      imageUrl: compagnie.imageUrl,
      localizedname: compagnie.localizedname
    };
    this.linkedinService.addinglinkedincompagnies(compagnierequest).subscribe(addingresult=>{
      this.messageService.add({key: 'companyadded', severity:'success', summary: 'Added', detail: compagnie.localizedname +'   added'});
      compagnie.existornot = false; //on change la valeur du booleen après ajout
      //this.linkedincompanyalreadyexist(compagnie);
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
  showDialogDashboard(){
    this.dboolchoosedashboard = true;
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
  onHideDisplayLinkedincompagnies(){
    this.displaylinkedincompany = false;
  }
  onHideDialogDashboard(){
    this.dboolchoosedashboard = false;
  }
  //this.peddle_social[0].peddle_social_stream;
  socialchange(){

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var user_email = {
      peddle_user_email:peddle_user_email
    };

    if(this.social_input.value == 'FaceBook'){
      /*this.facebookservice.gettingfacebooklisttream(user_email).subscribe(resliststream=>{
        let fcbkliststream = resliststream as [any];
        this.socialstreamlist = fcbkliststream;
      })*/
    }else if(this.social_input.value == 'LinkedIn'){
      this.linkedinService.gettinglinkedinliststream(user_email).subscribe(resliststream=>{
        let lkdliststream = resliststream as [any];
        this.socialstreamlist = lkdliststream;
        //console.log(lkdliststream[0].companyurn);
      })
    }else if(this.social_input.value == 'Twitter'){
      /*this.twitterservice.gettingtwitterliststream(user_email).subscribe(resliststream=>{
        let twliststream = resliststream as [any];
        this.socialstreamlist = twliststream;
      })*/
    }else if(this.social_input.value == 'Instagram'){

    }

    /*console.log(this.social_input.value);
    for(let i=0;i<this.peddle_social.length;i++){
      if(this.social_input.value == this.peddle_social[i].peddle_social_name){
        this.peddle_stream_list = this.peddle_social[i].peddle_social_stream;
        break;
      }
    }
    console.log(this.peddle_stream_list);*/
  }

  lisofactivitieslinkedin = [];
  listofmestweets = [];
  listofretweets = [];
  // valeurselectionnee:any;
  // obtenirleprofilselectionne(selected){
  //   this.valeurselectionnee = selected
  // }

  message_empty_dashboard = 'your dashboard is empty, please configure it first' ;
  gettingDashboardPreferences(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    var user_email = {
      peddle_user_email:peddle_user_email
    };

    this.dashboardservice.gettingdashboard(user_email).subscribe(ldsres=>{
      this.peddle_dashboard_record = ldsres as [any];
      if(this.peddle_dashboard_record.length != 0){
        this.message_empty_dashboard = '';
        for(let m=0; m<this.peddle_dashboard_record.length; m++){
          if(this.peddle_dashboard_record[m].social_input == 'LinkedIn' && this.peddle_dashboard_record[m].flux_input == 'Flux'){
            let usrlkdin = {
              peddle_user_email:peddle_user_email,
              companyurn: this.peddle_dashboard_record[m].profil_input
            };
            this.linkedinService.gettinglinkedinactivities(usrlkdin).subscribe(lkdactivities=>{
              let resultat = lkdactivities as [any];
              this.lisofactivitieslinkedin = resultat ;
                //console.log(resultat);
            })
          }
          if(this.peddle_dashboard_record[m].social_input == 'Twitter' && this.peddle_dashboard_record[m].flux_input == 'Mes Tweets'){
            this.twitterservice.gettingmestweets(user_email).subscribe(twittertweets=>{
              let mestweets = twittertweets as [any];
              this.listofmestweets = mestweets ;
              console.log(mestweets);
            })
          }
          if(this.peddle_dashboard_record[m].social_input == 'Twitter' && this.peddle_dashboard_record[m].flux_input == 'Retweets'){
            this.twitterservice.gettingretweet(user_email).subscribe(twitterretweets=>{
              let retweets = twitterretweets as [any];
              this.listofretweets = retweets ;
              console.log(retweets);
            });
          }
        }
      }
    })
  }

  /*fluxselected(){

    if(this.select_flux.value == 'Flux' && this.social_input.value == 'LinkedIn' && this.select_profil.value !=''){

      /!*console.log('################# localized');
      console.log(this.select_profil.value);*!/

      let companie = this.select_profil.value;
      /!*console.log('##########');
      console.log(companie);*!/
      let peddle_user = JSON.parse(sessionStorage.getItem('user'));
      let peddle_user_email = peddle_user.peddle_user_email;
      var user_email = {
        peddle_user_email:peddle_user_email,
        companyurn: this.select_profil.value,
      };
      this.linkedinService.gettinglinkedinactivities(user_email).subscribe(lkdactivities=>{
        let resultat = lkdactivities as [any];
        this.lisofactivitieslinkedin = resultat ;
        console.log(resultat);
      })
    }
  }

  fluxtwitterselected(){
    if(this.social_input.value == 'Twitter' && this.select_flux.value == 'Mes Tweets'){

      console.log('Mes Tweets');

      let peddle_user = JSON.parse(sessionStorage.getItem('user'));
      let peddle_user_email = peddle_user.peddle_user_email;

      var user_twitter = {
        peddle_user_email:peddle_user_email
      };

      this.twitterservice.gettingmestweets(user_twitter).subscribe(twittertweets=>{
        let mestweets = twittertweets as [any];
        this.listofmestweets = mestweets ;
        console.log(mestweets);
      })
    }else if(this.social_input.value == 'Twitter' && this.select_flux.value == 'Retweets'){
      console.log('ReTweets');

      let peddle_user = JSON.parse(sessionStorage.getItem('user'));
      let peddle_user_email = peddle_user.peddle_user_email;

      var user_retwits = {
        peddle_user_email:peddle_user_email
      };
      this.twitterservice.gettingretweet(user_retwits).subscribe(twitterretweets=>{
        let retweets = twitterretweets as [any];
        this.listofretweets = retweets ;
        console.log(retweets);
      });
    }
  }*/

  addstreamtodashboard(){

    /*this.lisofactivitieslinkedin = [];
    this.listofmestweets = [];
    this.listofretweets = [];*/
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var streamtoadd = {
      peddle_user_email : peddle_user_email,
      social_input : this.social_input.value,
      flux_input : this.select_flux.value,
      profil_input : this.select_profil.value // qui peut etre une page ou le profil personnel de l'utilisateur
    };

    if(this.select_flux.value == 'Flux' && this.social_input.value == 'LinkedIn' && this.select_profil.value !=''){
      this.lisofactivitieslinkedin = [];
      var user_email = {
        peddle_user_email:peddle_user_email,
        companyurn: this.select_profil.value,
      };
      this.linkedinService.gettinglinkedinactivities(user_email).subscribe(lkdactivities=>{
        let resultat = lkdactivities as [any];
        this.lisofactivitieslinkedin = resultat ;
        console.log(resultat);
      })
    }
    if(this.social_input.value == 'Twitter' && this.select_flux.value == 'Mes Tweets'){
      this.listofmestweets = [];
      var user_twitter = {
        peddle_user_email:peddle_user_email
      };

      this.twitterservice.gettingmestweets(user_twitter).subscribe(twittertweets=>{
        let mestweets = twittertweets as [any];
        this.listofmestweets = mestweets ;
        console.log(mestweets);
      })
    }
    if(this.social_input.value == 'Twitter' && this.select_flux.value == 'Retweets'){
      this.listofretweets = [];
      var user_retwits = {
        peddle_user_email:peddle_user_email
      };
      this.twitterservice.gettingretweet(user_retwits).subscribe(twitterretweets=>{
        let retweets = twitterretweets as [any];
        this.listofretweets = retweets ;
        console.log(retweets);
      });
    }

    this.dashboardservice.addstreamtodashboard(streamtoadd).subscribe(dsrest=>{
      this.peddle_dashboard_record.push(streamtoadd);
      this.messageService.add({key: 'fluxadded', severity:'success', summary: 'Adding Flux', detail: 'Flux added'})
    })
  }

  deletedashflux(dash){

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    console.log('before dashitem')

    var dashitem = {
      peddle_user_email : peddle_user_email,
      social_input : dash.social_input,
      flux_input : dash.flux_input,
      profil_input : dash.profil_input
    };

    for(let cd = 0; cd<this.peddle_dashboard_record.length; cd++){
      console.log('enter for loop')
      if(this.peddle_dashboard_record[cd].social_input ==dash.social_input && this.peddle_dashboard_record[cd].flux_input == dash.flux_input && this.peddle_dashboard_record[cd]== dash.profil_input){
        console.log('enter if statement')
        this.peddle_dashboard_record.splice(cd,1);
        this.dashboardservice.deletedashboarditem(dashitem).subscribe(delres=>{
          console.log('enter service instruction')
          this.messageService.add({key: 'fluxdeleted', severity:'success', summary: 'Delete', detail: 'Flux deleted'})
        });
        break;
      }
    }

  }


  profilesetting(){
    this.router.navigate(['profilesetting']);
  }

  converttimestamptodate(timestamp:number){
    return new Date(timestamp);
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
