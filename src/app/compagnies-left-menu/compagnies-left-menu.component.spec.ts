import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagniesLeftMenuComponent } from './compagnies-left-menu.component';

describe('CompagniesLeftMenuComponent', () => {
  let component: CompagniesLeftMenuComponent;
  let fixture: ComponentFixture<CompagniesLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagniesLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagniesLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
