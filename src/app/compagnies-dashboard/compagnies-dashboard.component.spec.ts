import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagniesDashboardComponent } from './compagnies-dashboard.component';

describe('CompagniesDashboardComponent', () => {
  let component: CompagniesDashboardComponent;
  let fixture: ComponentFixture<CompagniesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagniesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagniesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
