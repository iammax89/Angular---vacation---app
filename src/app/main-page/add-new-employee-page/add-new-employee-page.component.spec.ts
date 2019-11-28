import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEmployeePageComponent } from './add-new-employee-page.component';

describe('AddNewEmployeePageComponent', () => {
  let component: AddNewEmployeePageComponent;
  let fixture: ComponentFixture<AddNewEmployeePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEmployeePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
