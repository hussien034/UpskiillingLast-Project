import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {
  users: any = [
    { name: "Hussien", id: '64c946e765b23cd68181fe12' },
    { name: "Ali", id: '64c9476e65b23cd68181fe15'},
    {name:"hossam", id:'64cbdabc3aff3521ea3e2ee3'}
  ];
  fileName=""
  newTaskForm!: FormGroup;

  constructor(private fb: FormBuilder ,
    @Inject (MAT_DIALOG_DATA) public Data:any,
    private service:TasksService ,
     private tostaer:ToastrService ,
      private spinner:NgxSpinnerService,
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<AddTasksComponent>) {}

  ngOnInit(): void {
    this.createForm();
    console.log(this.Data)
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: [this.Data?.title || '', [Validators.required, Validators.minLength(5)]],
      userId: [this.Data?.userId?._id || '', Validators.required],
      image:[this.Data?.image || '', Validators.required],
      description: [this.Data?.description || '', Validators.required],
      deadline: [this.Data? new Date(this.Data?.deadline.split('-').reverse().join('-')).toISOString() :'', Validators.required]
    });
  }
  selectImage(event:any){
    this.fileName=event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0])

  }
  createTask() {
    this.spinner.show()
    let model:any = this.preperFormData()
    this.service.createTask(model).subscribe( res=>{
      this.tostaer.success("Task Created Succesfully")
      this.spinner.hide();
      this.dialogRef.close(true)
    }, error=>{
      this.spinner.hide()
      this.tostaer.error(error.error.message)
    })
  }
  updateTask(){
    this.spinner.show()
    let model:any = this.preperFormData()
    this.service.updateTask(model, this.Data._id).subscribe( res=>{
      this.tostaer.success("Task Created Succesfully")
      this.spinner.hide();
      this.dialogRef.close(true)
    }, error=>{
      this.spinner.hide()
      this.tostaer.error(error.error.message)
    })
  }
  preperFormData(){
    let newData= moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData= new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key , value] : any) =>{
      if(key =='deadline'){
        formData.append(key,newData)
      }
      else{
        formData.append(key,value)
      }
    })
    return formData
  }
}


