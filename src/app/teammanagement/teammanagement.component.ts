import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
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
import {DomSanitizer} from '@angular/platform-browser';
import {any} from 'codelyzer/util/function';


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
  checkifpeddleexist = false; // check if peddle name already exist
  createpeddleteammember = false;
  boolspinnersteammember = false;
  updatepeddleteammember = false;
  boolspinnersupdateteammember = false;
  //boutonupdate = false ;

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
  peddle_team_description = new FormControl('',[Validators.required,Validators.minLength(100)]);

  peddle_team_member_name = new FormControl('',[Validators.required,Validators.minLength(4)]);
  peddle_team_member_profile ='assets/information.png';//= new FormControl('');
  peddle_team_member_email = new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]);
  peddle_team_member_password = new FormControl('',[Validators.required,Validators.minLength(2)]);
  peddle_team_member_statut = new FormControl('activated'); //activated desactivated
  peddle_team_member_file_name='';




  update_peddle_team_member_name = new FormControl('',[Validators.required,Validators.minLength(4)]);
  update_peddle_team_member_profile ='assets/information.png';//= new FormControl('');
  update_peddle_team_member_email = new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]);
  update_peddle_team_member_password = new FormControl('',[Validators.required,Validators.minLength(2)]);
  update_peddle_team_member_statut = new FormControl('activated'); //activated desactivated
  update_peddle_team_member_file_name='';


  listofteams=[];
  listofteamsmember=[{}];
  listofteamselected=[];

  constructor(private router: Router,private modalService: NgbModal,private linkedinService:LinkedinService,public afAuth: AngularFireAuth,private activatedRoute: ActivatedRoute,private authService: SocialAuthService,private messageService: MessageService, public twitterservice:TwitterService, private facebookservice: FacebookService, private teamService: TeamService,private sanitizer:DomSanitizer, private confirmationService: ConfirmationService) { }

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

    var peddle_user_request = {
      peddle_user_email : peddle_user.peddle_user_email
    };

    this.teamService.gettinglistteam(peddle_user_request).subscribe(peddle_list_result=>{
      let resultat  = peddle_list_result as [any];
      //console.log('console team');
      this.listofteams = resultat;
      if(this.listofteams.length!=0){
        this.peddle_team_management = new FormControl(this.listofteams[0].peddle_team_name);
      }
      //console.log(this.listofteams);
    })

    //this.listofteamsmember.push(22222);

  }

  gettingteammember(){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    var peddle_teammember_request = {
      peddle_user_email : peddle_user_email,
      peddle_team_name : this.peddle_team_management.value
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
      this.facebookservice.savefacebookaccount(data).subscribe(res=>{
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
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var data = {
      peddle_team_name : this.peddle_team_name.value,
      peddle_user_email : peddle_user_email
    };
    this.teamService.existteamname(data).subscribe(res=>{
      console.log('enter');
      if(res == true){
        this.checkifpeddleexist = true;
      }else{
        this.checkifpeddleexist = false;
      }
    });

    return this.checkifpeddleexist ;
  }

  addteam(){

    this.boolspinnersteam = true;
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    if(!this.checkifpeddleexist&&this.peddle_team_name.valid && this.peddle_team_description)
    var peddle_team = {
      peddle_team_name : this.peddle_team_name.value,
      peddle_team_description : this.peddle_team_description.value,
      peddle_user_email : peddle_user_email
    };

    this.teamService.saveteam(peddle_team).subscribe(result=>{
      this.messageService.add({key: 'streamadded', severity:'success', summary: 'Save team', detail: 'New team is Saved'});
      this.listofteams.push({
        peddle_team_name : this.peddle_team_name.value,
        peddle_team_description : this.peddle_team_description.value
      });
      this.boolspinnersteam = false;
      this.displaypeddleteamcreate = false;
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

  addteammember(){
    this.boolspinnersteammember = true;

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    //console.log(peddle_user_email);

    console.log('#####################');
    console.log(peddle_user_email);
    console.log('######################');

    if(this.peddle_team_member_name.valid&&this.peddle_team_member_password.valid&&this.checkemail(peddle_user_email,this.peddle_team_member_email.value)){
      let  peddle_team_member = {
        peddle_user_email : peddle_user_email,
        peddle_team_name:this.peddle_team_management.value,
        peddle_team_member_name : this.peddle_team_member_name.value,
        peddle_team_member_password: this.peddle_team_member_password.value,
        peddle_team_member_email: this.peddle_team_member_email.value,
        peddle_team_member_statut: this.peddle_team_member_statut.value,
        peddle_team_member_profile: this.peddle_team_member_profile
      };

      /*this.listofteamsmember.push(
        {
          peddle_team_member_name : this.peddle_team_member_name.value,
          peddle_team_member_password: this.peddle_team_member_password.value,
          peddle_team_member_email: this.peddle_team_member_email.value,
          peddle_team_member_statut: this.peddle_team_member_statut.value,
          peddle_team_member_profile: this.peddle_team_member_profile
        }
      );*/

      console.log(typeof  this.listofteamsmember)

      this.teamService.addteammember(peddle_team_member).subscribe(peddle_team_member_result=>{
        this.messageService.add({key: 'teammemberadded', severity:'success', summary: 'Save team member', detail: 'your team member is added'});
        //let team_member_result = peddle_team_member_result as any;
        //console.log(typeof  this.listofteamsmember)

        this.listofteamsmember.push({
          'peddle_team_member_name' : this.peddle_team_member_name.value,
          'peddle_team_member_password': this.peddle_team_member_password.value,
          'peddle_team_member_email': this.peddle_team_member_email.value,
          'peddle_team_member_statut': this.peddle_team_member_statut.value,
          'peddle_team_member_profile': this.peddle_team_member_profile
        });
        //console.log(typeof  this.listofteamsmember)
        this.createpeddleteammember = false;
        //console.log(team_member_result);
        this.boolspinnersteammember = false;
      });
    }
  }

  updateteammember(){

    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;

    var newobject={
      peddle_user_email : peddle_user_email,
      peddle_team_name:this.peddle_team_management.value,
      peddle_team_member_email_to_update : this.objecttoupdate.peddle_team_member_email, // valeur de l'ancien email qu'on doit modifier
      peddle_team_member_name : this.update_peddle_team_member_name.value,
      peddle_team_member_password: this.update_peddle_team_member_password.value,
      peddle_team_member_email: this.update_peddle_team_member_email.value,
      peddle_team_member_statut: this.update_peddle_team_member_statut.value,
      peddle_team_member_profile: this.update_peddle_team_member_profile
    }; //sameobject

    if(this.objecttoupdate.peddle_team_member_name == newobject.peddle_team_member_name &&  this.objecttoupdate.peddle_team_member_password == newobject.peddle_team_member_password &&
      this.objecttoupdate.peddle_team_member_email == newobject.peddle_team_member_email && this.objecttoupdate.peddle_team_member_statut == newobject.peddle_team_member_statut &&
      this.objecttoupdate.peddle_team_member_profile == newobject.peddle_team_member_profile){

      this.messageService.add({key: 'sameobject', severity:'error', summary: 'Same value', detail: 'values are same than older'});
    }else{
      this.boolspinnersupdateteammember = true;
      this.teamService.updatememberinformation(newobject).subscribe(resmemberupdate=>{
        this.messageService.add({key: 'updatemembersucess', severity:'success', summary: 'Member updated', detail: 'member has been updated'});
        // j'enlève l'ancien membre et je met le nouveau
        for(let i =0; i<this.listofteamsmember.length; i++){
          let membertoupdate = this.listofteamsmember[i] as any ;
          if(membertoupdate.peddle_team_member_email == this.objecttoupdate.peddle_team_member_email){
            console.log("########");
            console.log(true);
            console.log("########");
            this.listofteamsmember.splice(i,1);
            break
          }
        }
        this.boolspinnersupdateteammember = false;
        this.updatepeddleteammember = false;
      });
    }
  }

  //gestion du confirm dialog pour le delete member

  deletemember(member){
    let peddle_user = JSON.parse(sessionStorage.getItem('user'));
    let peddle_user_email = peddle_user.peddle_user_email;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + member.peddle_team_member_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};*/
        var membertodelete = {
          peddle_user_email : peddle_user_email,
          peddle_team_name:this.peddle_team_management.value,
          peddle_team_member_email: member.peddle_team_member_email
        };

        console.log(membertodelete);
        this.teamService.deletemember(membertodelete).subscribe(resmemberdelete=>{
          for(let i =0; i<this.listofteamsmember.length; i++){
            let membertodelete = this.listofteamsmember[i] as any ;
            if(membertodelete.peddle_team_member_email == member.peddle_team_member_email){
              console.log("########");
              console.log(true);
              console.log("########");
              this.listofteamsmember.splice(i,1);
              break;
            }
          }
          this.messageService.add({key: 'memberdeleted',severity:'success', summary: 'Successful', detail: 'Member Deleted', life: 3000});
        })
      }
    });
  }



  checkemail(companyemail,memberemail){
    if(this.teamService.processingemail(companyemail.toString())!=this.teamService.processingemail(memberemail.toString())){
      return false;
      this.messageService.add({key: 'teammemberaddederror', severity:'error', summary: 'Save team member', detail: 'email must match email company'});
    }else{
      return true ;
    }
  }

  onclicktwitter(){

  }


  filechangeevent(event){

    let filename = '';

    console.log('image');
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    filename = filename + '  ' +file.name;
    this.peddle_team_member_file_name = filename;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //console.log(reader.readAsDataURL(file));

    reader.onload = ()=> {
      this.peddle_team_member_profile = reader.result as string
      //me.modelvalue = reader.result
      //console.log(typeof reader.result);
    };
  }

  fileupdateevent(event){
    let filename = '';

    console.log('image');
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    filename = filename + '  ' +file.name;
    this.update_peddle_team_member_file_name = filename;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //console.log(reader.readAsDataURL(file));

    reader.onload = ()=> {
      this.update_peddle_team_member_profile = reader.result as string
      //me.modelvalue = reader.result
      //console.log(typeof reader.result);
    };
  }

  transformf(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.peddle_team_member_profile);
  }

  updatetransformf(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.update_peddle_team_member_profile);
  }


  showDialogcreatepeddleteammember(){
    if(this.listofteams.length!=0){
      this.createpeddleteammember = true;
      console.log(this.peddle_team_management.value);
    }else {
      this.messageService.add({key: 'emptyteam', severity:'error', summary: 'Select team', detail: 'empty team'});
    }
  }

  objecttoupdate;// objet(membre) initial lorsqu'on ouvre le popup
  showDialogupdatepeddleteammember(member){
    this.objecttoupdate = member;

    this.updatepeddleteammember = true;
    this.update_peddle_team_member_profile = member.peddle_team_member_profile;
    this.update_peddle_team_member_name = new FormControl(member.peddle_team_member_name);
    this.update_peddle_team_member_email = new FormControl(member.peddle_team_member_email);
    this.update_peddle_team_member_password = new FormControl(member.peddle_team_member_password);
    this.update_peddle_team_member_statut = new FormControl(member.peddle_team_member_statut);
    console.log(member)
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
  onHidecreatepeddleteammember(){
    this.createpeddleteammember = false;
    this.peddle_team_member_name = new FormControl('',[Validators.required,Validators.minLength(4)]);
    this.peddle_team_member_profile ='assets/information.png';//= new FormControl('');
    this.peddle_team_member_file_name ='';
    this.peddle_team_member_email = new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]);
    this.peddle_team_member_password = new FormControl('',[Validators.required,Validators.minLength(2)]);
    this.peddle_team_member_statut = new FormControl('activated');
    this.boolspinnersteammember=false;
  }

  onHideupdatepeddleteammember(){
    this.updatepeddleteammember = false;
    this.boolspinnersupdateteammember = false ;
  }

  cancelupdatemember(){
    this.updatepeddleteammember = false;
    this.boolspinnersupdateteammember = false ;
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
