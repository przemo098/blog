import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvInteractiveComponent } from './cv-interactive.component';

describe('CvInteractiveComponent', () => {
  let component: CvInteractiveComponent;
  let fixture: ComponentFixture<CvInteractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvInteractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
