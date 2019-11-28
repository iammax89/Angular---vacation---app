import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestDashboardComponent } from './vacation-request-dashboard.component';

describe('VacationRequestDashboardComponent', () => {
  let component: VacationRequestDashboardComponent;
  let fixture: ComponentFixture<VacationRequestDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
