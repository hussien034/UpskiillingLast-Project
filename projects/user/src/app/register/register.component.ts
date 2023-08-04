import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { CreateAccount } from '../auth/constant/DTO';
import { LoginService } from '../login.service';
import { group } from '@angular/animations';
import { Router } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
constructor(private fb:FormBuilder,
  private service:LoginService,
  private roter:Router,
  private spinner:NgxSpinnerService,
  private toster:ToastrService){}
registerForm!:FormGroup
ngOnInit(){
  this.creataForm()
}
creataForm(){
this.registerForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',Validators.required],
  username:['',Validators.required],
  role:['user']
})
}
createAccount(){
  const MODEL:CreateAccount={
    email:this.registerForm.value['email'],
    role:'user',
    username:this.registerForm.value['username'],
    password:this.registerForm.value['password']
  }
  this.spinner.show();
  this.service.createUser(MODEL).subscribe(res=>{
    this.roter.navigateByUrl('/login');
    this.toster.success("Register Success")
    this.spinner.hide()
  },error=>{
    this.toster.error(error.error.massage)
    this.spinner.hide();

  })
}
}
