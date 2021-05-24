import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleOpportunitiesComponent } from './peddle-opportunities.component';

describe('PeddleOpportunitiesComponent', () => {
  let component: PeddleOpportunitiesComponent;
  let fixture: ComponentFixture<PeddleOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
