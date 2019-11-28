import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestPageComponent } from './vacation-request-page.component';

describe('VacationRequestPageComponent', () => {
  let component: VacationRequestPageComponent;
  let fixture: ComponentFixture<VacationRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
