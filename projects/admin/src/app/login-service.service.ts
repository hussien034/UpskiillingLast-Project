import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from './context/DTO';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor( private http:HttpClient) { }
  login(model: Login){
    return this.http.post('https://online-tasks.onrender.com/auth/login',model)
  }
}
