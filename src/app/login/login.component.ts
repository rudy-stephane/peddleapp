import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {SignupService} from '../services/signup.service';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

// tslint:disable
export class LoginComponent implements OnInit {
  successMessage: any;
  msgs: Message[];
  invalidcredmessage=false;


  password = new FormControl('',[Validators.required,Validators.minLength(1)]);
  email = new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]);
  boolspinner= false;

  constructor(private router: Router, private signupService:SignupService,private messageService: MessageService) { }
//new
  ngOnInit(): void {
    this.msgs = [
      {severity:'error', summary:'Error', detail:'Invalid credential'}
    ];
    /*console.log(sessionStorage.getItem('peddle_user_email'));
    console.log(sessionStorage.getItem('peddle_user_password'));
    console.log(sessionStorage.getItem('peddle_user_name'));
    console.log(sessionStorage.getItem('peddle_user_plan'));*/

  }

  validatepassword() {

  }

  validatelogin() {

  }

  recordvalue() {
    this.router.navigate(['brandambassador']);
  }

  login() {
    /*let lemail = sessionStorage.getItem('peddle_user_email');
    let lpassword = sessionStorage.getItem('peddle_user_password');*/
    if(this.email.valid&&this.password.valid){
      this.boolspinner= true;
      var user = {
        peddle_user_password :this.password.value,
        peddle_user_email :this.email.value,
      };
      //console.log('res');
      this.signupService.login(user).subscribe(res=>{
        //console.log(res);
        if(res == false){
          //console.log('invalid credential')
          this.messageService.add({key: 'credential', severity:'error', summary: 'Credential', detail: 'Invalid Credential'});
          this.boolspinner= false;
        }else{
          sessionStorage.setItem('user',JSON.stringify(res));// brandambassador
          this.router.navigate(['entrepreneur']);
        }
        //console.log(typeof  res);
       // this.router.navigate(['brandambassador']);
      },err=>{
        this.boolspinner= false;
      });
      console.log(true)
    }
  }
}
