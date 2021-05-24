import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleUsersProfileComponent } from './peddle-users-profile.component';

describe('PeddleUsersProfileComponent', () => {
  let component: PeddleUsersProfileComponent;
  let fixture: ComponentFixture<PeddleUsersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleUsersProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleUsersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
