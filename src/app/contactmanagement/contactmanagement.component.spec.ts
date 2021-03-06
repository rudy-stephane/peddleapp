import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmanagementComponent } from './contactmanagement.component';

describe('ContactmanagementComponent', () => {
  let component: ContactmanagementComponent;
  let fixture: ComponentFixture<ContactmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
