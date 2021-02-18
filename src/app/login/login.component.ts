import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {SignupService} from '../services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// tslint:disable
export class LoginComponent implements OnInit {
  successMessage: any;


  password = new FormControl('',[Validators.required,Validators.minLength(1)]);
  email = new FormControl('',[Validators.required,Validators.minLength(1)]);

  constructor(private router: Router, private signupService:SignupService) { }
//new
  ngOnInit(): void {
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
      var user = {
        peddle_user_password :this.password.value,
        peddle_user_email :this.email.value,
      };
      //console.log('res');
      this.signupService.login(user).subscribe(res=>{
        //console.log(res);
        if(res == false){
          console.log('invalid credential')
        }else{
          sessionStorage.setItem('user',JSON.stringify(res));
          this.router.navigate(['brandambassador']);
        }
        //console.log(typeof  res);
       // this.router.navigate(['brandambassador']);
      },err=>{

      });
      console.log(true)
    }
  }
}
