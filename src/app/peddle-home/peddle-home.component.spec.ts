import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleHomeComponent } from './peddle-home.component';

describe('PeddleHomeComponent', () => {
  let component: PeddleHomeComponent;
  let fixture: ComponentFixture<PeddleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
