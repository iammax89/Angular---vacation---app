import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestFormComponent } from './vacation-request-form.component';

describe('VacationRequestFormComponent', () => {
  let component: VacationRequestFormComponent;
  let fixture: ComponentFixture<VacationRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
