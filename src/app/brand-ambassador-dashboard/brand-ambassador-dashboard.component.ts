import { Component, OnInit } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import {FormControl} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LinkedinService} from '../services/linkedin.service';
import {ActivatedRoute} from '@angular/router';
/*import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';*/


import {SocialAuthService} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
// @ts-ignore
import { FacebookLoginProvider } from 'angularx-social-login';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-brand-ambassador-dashboard',
  templateUrl: './brand-ambassador-dashboard.component.html',
  styleUrls: ['./brand-ambassador-dashboard.component.css']
})


// tslint:disable
export class BrandAmbassadorDashboardComponent implements OnInit {

  peddle_social = [{peddle_social_name:'LinkedIn',peddle_social_stream:['post','scheduled']},{peddle_social_name:'FaceBook',peddle_social_stream:['post','page','mentions','scheduled']},{peddle_social_name:'Twitter',peddle_social_stream:['tweet','page','scheduled']}]

  social_input = new FormControl('LinkedIn');

  urllink = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77b17box86iq9n&redirect_uri=https://peddleapp.herokuapp.com/brandambassador&scope=r_emailaddress r_fullprofile w_member_social';

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

  constructor(private modalService: NgbModal,private linkedinService:LinkedinService,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService) { }

  ngOnInit(): void {

    //this.activatedRoute.queryParams.

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

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

          /*let reponse = result as any ;
          let access_token = reponse.access_token;

          console.log('################################');
          console.log('################################');
          console.log('access_token  :   '+ access_token);
          console.log('################################');
          console.log('################################');*/

        })
      }
      /*console.log('parametre');
      console.log(params);
      console.log('code de parametre');
      let date = params['code'];
      console.log(date); // Print the parameter to the console.*/
    });
  }
  SigninwithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }


  existlinkedinaccount(){
    let existLinkedin = false;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.linkedinService.sendcode(peddle_user_email).subscribe(result=>{
      if (result == true){
        existLinkedin = true;
      }else{
        existLinkedin = false;
      }
    })
    return existLinkedin;
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
