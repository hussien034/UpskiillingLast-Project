import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(
private fb:FormBuilder,
private service:LoginService,
private roter:Router,
private spinner:NgxSpinnerService,
private toster:ToastrService){}
loginForm!:FormGroup
ngOnInit(){
this.createForm();
}
createForm(){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    role:['user']
  })
}
login(){
  this.spinner.show();
  this.service.login(this.loginForm.value).subscribe( (res:any)=>{
    localStorage.setItem("token",res.token)
    this.roter.navigateByUrl('/tasks');
    this.toster.success("Register Success");
    this.spinner.hide()
  },error=>{
    this.toster.error(error.error.massage)
    this.spinner.hide()
  })
}
}
