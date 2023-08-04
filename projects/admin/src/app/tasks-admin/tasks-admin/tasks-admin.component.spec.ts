import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAdminComponent } from './tasks-admin.component';

describe('TasksAdminComponent', () => {
  let component: TasksAdminComponent;
  let fixture: ComponentFixture<TasksAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksAdminComponent]
    });
    fixture = TestBed.createComponent(TasksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
