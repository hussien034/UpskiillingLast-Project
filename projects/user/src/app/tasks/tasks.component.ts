import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(public dialog: MatDialog ,private fb:FormBuilder ,private service:TasksService) { }
page=1;
userData:any=[];
selectionStatus:string="In-Progress"
  ngOnInit() {
    this.createform();
    this.getUserData();
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }
  getUserData(){
    let token=JSON.stringify(localStorage.getItem('token'))
    this.userData=JSON.parse(window.atob(token.split('.')[1]))
    console.log(this.userData)
  }
  getAllTasks() {
    let parms={
      page:this.page,
      limt:10,
      status:this.selectionStatus
    }
    this.service.getUserTasks(this.userData.userId ,parms).subscribe((res:any)=>{
      this.dataSource=res.tasks
    })
  }
}
