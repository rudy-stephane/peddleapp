import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddlePlanComponent } from './peddle-plan.component';

describe('PeddlePlanComponent', () => {
  let component: PeddlePlanComponent;
  let fixture: ComponentFixture<PeddlePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddlePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddlePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
