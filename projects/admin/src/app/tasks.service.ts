import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createTask } from './tasks-admin/tasks-admin/context/DTO';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  getAllTasks(filter:any){
    let params= new HttpParams();
    Object.entries(filter).forEach(([key,value]: any)=>{
       if(value){
      params=params.append(key,value)
    }
    })
    return this.http.get('https://online-tasks.onrender.com/tasks/all-tasks' ,{params})
  }
  createTask(model:createTask){
    return this.http.post('https://online-tasks.onrender.com/tasks/add-task',model)
  }
  deleteTask(id:any){
    return this.http.delete('https://online-tasks.onrender.com/tasks/delete-task/' + id)
  }
  updateTask(model:any , id:any){
    return this.http.put('https://online-tasks.onrender.com/tasks/edit-task/' + id ,model)
  }
}
