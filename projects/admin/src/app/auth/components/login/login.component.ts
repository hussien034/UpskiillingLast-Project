import { Component } from '@angular/core';
import { FormBuilder, Validators , FormGroup} from "@angular/forms";
import { Login, LoginResponse } from '../../../context/DTO';
import { LoginServiceService } from '../../../login-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TasksAdminComponent } from '../../../tasks-admin/tasks-admin/tasks-admin.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb:FormBuilder , private service:LoginServiceService, private tosstar:ToastrService, private router:Router,private spinner: NgxSpinnerService){}
loginForm!:FormGroup
ngOnInit(){
this.creatForm()
}
creatForm(){
  this.loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(3)]],
    role:['admin']
  });

}
login(){
this.spinner.show();
this.service.login(this.loginForm.value).subscribe( (res:any) =>{
  localStorage.setItem("token",res.token)
this.tosstar.success("success", "Login success");
this.router.navigateByUrl('/task-admin');
this.spinner.hide();
}, error=>{
  this.tosstar.error("Fileid")
} )
}
}
