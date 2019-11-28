import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestsListComponent } from './vacation-requests-list.component';

describe('VacationRequestsListComponent', () => {
  let component: VacationRequestsListComponent;
  let fixture: ComponentFixture<VacationRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
