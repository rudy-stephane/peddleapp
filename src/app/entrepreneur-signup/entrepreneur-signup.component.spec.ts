import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurSignupComponent } from './entrepreneur-signup.component';

describe('EntrepreneurSignupComponent', () => {
  let component: EntrepreneurSignupComponent;
  let fixture: ComponentFixture<EntrepreneurSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepreneurSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
