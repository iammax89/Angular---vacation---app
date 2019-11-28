import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysAvaliableDashboardComponent } from './days-avaliable-dashboard.component';

describe('DaysAvaliableDashboardComponent', () => {
  let component: DaysAvaliableDashboardComponent;
  let fixture: ComponentFixture<DaysAvaliableDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysAvaliableDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysAvaliableDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
