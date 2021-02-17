import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagniesSignupComponent } from './compagnies-signup.component';

describe('CompagniesSignupComponent', () => {
  let component: CompagniesSignupComponent;
  let fixture: ComponentFixture<CompagniesSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagniesSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagniesSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
