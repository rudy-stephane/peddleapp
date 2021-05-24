import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleContactsComponent } from './peddle-contacts.component';

describe('PeddleContactsComponent', () => {
  let component: PeddleContactsComponent;
  let fixture: ComponentFixture<PeddleContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
