import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHrComponent } from './shared-hr.component';

describe('SharedHrComponent', () => {
  let component: SharedHrComponent;
  let fixture: ComponentFixture<SharedHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
