import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAmbassadorDashboardComponent } from './brand-ambassador-dashboard.component';

describe('BrandAmbassadorDashboardComponent', () => {
  let component: BrandAmbassadorDashboardComponent;
  let fixture: ComponentFixture<BrandAmbassadorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAmbassadorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandAmbassadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
