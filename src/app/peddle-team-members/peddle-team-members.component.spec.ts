import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleTeamMembersComponent } from './peddle-team-members.component';

describe('PeddleTeamMembersComponent', () => {
  let component: PeddleTeamMembersComponent;
  let fixture: ComponentFixture<PeddleTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleTeamMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
