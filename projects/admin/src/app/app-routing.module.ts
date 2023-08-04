import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { TasksAdminComponent } from './tasks-admin/tasks-admin/tasks-admin.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"Login",component:LoginComponent},
  {path:"task-admin",component:TasksAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
