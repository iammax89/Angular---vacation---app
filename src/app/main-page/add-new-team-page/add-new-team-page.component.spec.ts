import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeamPageComponent } from './add-new-team-page.component';

describe('AddNewTeamPageComponent', () => {
  let component: AddNewTeamPageComponent;
  let fixture: ComponentFixture<AddNewTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
