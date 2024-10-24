import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchControlComponent } from './employee-search-control.component';

describe('EmployeeSearchControlComponent', () => {
  let component: EmployeeSearchControlComponent;
  let fixture: ComponentFixture<EmployeeSearchControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSearchControlComponent]
    });
    fixture = TestBed.createComponent(EmployeeSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
