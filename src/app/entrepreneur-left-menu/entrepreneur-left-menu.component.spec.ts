import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurLeftMenuComponent } from './entrepreneur-left-menu.component';

describe('EntrepreneurLeftMenuComponent', () => {
  let component: EntrepreneurLeftMenuComponent;
  let fixture: ComponentFixture<EntrepreneurLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepreneurLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
