import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount, Login } from './auth/constant/DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  createUser(model:CreateAccount){
    return this.http.post('https://online-tasks.onrender.com/auth/createAccount',model)
  }
  login(model:Login){
    return this.http.post('https://online-tasks.onrender.com/auth/login',model)
  }
}
