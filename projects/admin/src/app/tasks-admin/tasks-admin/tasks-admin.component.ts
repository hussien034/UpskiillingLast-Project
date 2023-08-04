import { Component, Inject, inject } from '@angular/core';
import { TasksService } from '../../tasks.service';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTasksComponent } from '../../add-tasks/add-tasks.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import {NgxPaginationModule} from 'ngx-pagination';

export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}
@Component({
  selector: 'app-tasks-admin',
  templateUrl: './tasks-admin.component.html',
  styleUrls: ['./tasks-admin.component.css']
})
export class TasksAdminComponent {
  users: any = [
    { name: "Hussien", id: '64c946e765b23cd68181fe12' },
    { name: "Ali", id: '64c9476e65b23cd68181fe15'}
  ];
  status:any=[
    {name:"complete"},
    {name:" In-Progress "}
  ]
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  AllData=[];
  page:any=1;
filteration:any={
  page:this.page,
  limit:10
};
timeOutId:any;

total:any
constructor(
  private services:TasksService ,
  public  dialog: MatDialog ,
  private spinner:NgxSpinnerService,
  private toster:ToastrService){}
ngOnInit(){
  this.getAllTasksFromApi();
}
search(event:any){
  this.filteration['keyword']= event.value;
  this.page=1
this.filteration['page']=1
  clearTimeout(this.timeOutId)
  this.timeOutId=setTimeout(() => {
    this.getAllTasksFromApi()
  }, 2000);
}
selectUser(event:any){
  this.filteration['userId']=event.value;
  this.page=1
this.filteration['page']=1
  this.getAllTasksFromApi()
}
selectStatus(event:any){
  this.filteration['status']=event.value.trim();
  this.page=1
this.filteration['page']=1
  this.getAllTasksFromApi()
}
selectDate(event:any ,type:any){
  this.page=1
this.filteration['page']=1
   this.filteration[type]=moment(event.value['deadline']).format('DD-MM-YYYY');

   if(type=='toDate' && this.filteration['toDate'] !== 'Invalid date'){
    this.getAllTasksFromApi()
   }
}
getAllTasksFromApi(){
  this.spinner.show()
  this.services.getAllTasks(this.filteration).subscribe((res:any)=>{
    this.AllData= this.mappingTasks(res.tasks)
    this.total=res.totalItems
    this.spinner.hide()
  }, error =>{
    this.toster.error(error.error.massage)
    this.spinner.hide()
  })
}
mappingTasks(data:any){
  let newTasks = data.map( (item:any) =>{
    return{
      ...item,
      user:item.userId.username
    }
  })
  return newTasks
}
addTask(){
  const dialogRef = this.dialog.open(AddTasksComponent, {
   width:'750px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result==true){
      this.getAllTasksFromApi()
    }
  });
}
deleteTask(id:any){
  this.spinner.show();
  this.services.deleteTask(id).subscribe( res=>{
    this.toster.success("Task Deleted")
    this.spinner.hide()
    this.getAllTasksFromApi()
  }, error=>{
    this.toster.error(error.error.massage);
    this.spinner.hide()
  })
}
UpdateTask(element:any){
  const dialogRef = this.dialog.open(AddTasksComponent, {
    width:'750px',
    data:element
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result==true){
       this.getAllTasksFromApi()
     }
   });
}
changePage(event:any){
this.page=event
this.filteration['page']=event
this.getAllTasksFromApi()
}
}
