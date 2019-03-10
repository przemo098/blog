import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTodoComponent } from './angular-todo.component';

describe('AngularTodoComponent', () => {
  let component: AngularTodoComponent;
  let fixture: ComponentFixture<AngularTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
