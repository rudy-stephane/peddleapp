import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleAnalyticsComponent } from './peddle-analytics.component';

describe('PeddleAnalyticsComponent', () => {
  let component: PeddleAnalyticsComponent;
  let fixture: ComponentFixture<PeddleAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
