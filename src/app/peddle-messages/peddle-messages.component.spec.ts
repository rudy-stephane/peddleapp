import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleMessagesComponent } from './peddle-messages.component';

describe('PeddleMessagesComponent', () => {
  let component: PeddleMessagesComponent;
  let fixture: ComponentFixture<PeddleMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
