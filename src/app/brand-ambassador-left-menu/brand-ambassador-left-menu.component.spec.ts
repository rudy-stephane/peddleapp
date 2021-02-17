import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAmbassadorLeftMenuComponent } from './brand-ambassador-left-menu.component';

describe('BrandAmbassadorLeftMenuComponent', () => {
  let component: BrandAmbassadorLeftMenuComponent;
  let fixture: ComponentFixture<BrandAmbassadorLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAmbassadorLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandAmbassadorLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
