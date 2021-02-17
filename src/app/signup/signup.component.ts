import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignupService} from '../services/signup.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
// tslint:disable
export class SignupComponent implements OnInit {
  successMessage: any;

  name = new FormControl('',[Validators.required,Validators.minLength(1)]);
  password = new FormControl('',[Validators.required,Validators.minLength(8)]);
  passwordconfirm = new FormControl('',[Validators.required,Validators.minLength(8)]);
  email = new FormControl('',[Validators.required,Validators.minLength(1)]);
  plan = new FormControl('Ambassador',[Validators.required,Validators.minLength(1)]);
  termsandconditions = new FormControl('',[Validators.required,Validators.minLength(1)]);

  confirmpassword = true;

  constructor(private signupService:SignupService, private router: Router,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  signup(){

    if(this.name.valid && this.password.valid&& this.termsandconditions.valid&&this.plan.valid&&this.termsandconditions.valid){
      var user = {
        peddle_user_name :this.name.value,
        peddle_user_password :this.password.value,
        peddle_user_email :this.email.value,
        peddle_user_plan :this.plan.value,
        peddle_user_profile :this.transform,
      };

      this.signupService.signup(user).subscribe(res=>{
        this.router.navigate(['login']);
      },err=>{

      });

    }

  }


  validPassword(){
    let bvalue = this.password.value == this.passwordconfirm.value;
    if(this.passwordconfirm.valid && bvalue){
      this.confirmpassword = false;
    }else{
      this.confirmpassword = true;
    }
  }

  transform = 'assets/information.png';
  filename ='';

  filechangeevent(event){

    console.log('image');
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.filename = this.filename + '  ' +file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //console.log(reader.readAsDataURL(file));

    reader.onload = ()=> {
      this.transform = reader.result as string
      //me.modelvalue = reader.result
      //console.log(typeof reader.result);
    };
  }

  transformf(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.transform);
  }

}
