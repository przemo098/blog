import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HybridAppComponent } from './hybrid-app.component';

describe('HybridAppComponent', () => {
  let component: HybridAppComponent;
  let fixture: ComponentFixture<HybridAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
