import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationsTableComponent } from './vacations-table.component';

describe('VacationsTableComponent', () => {
  let component: VacationsTableComponent;
  let fixture: ComponentFixture<VacationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
