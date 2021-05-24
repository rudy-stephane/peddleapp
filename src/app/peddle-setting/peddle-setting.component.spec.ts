import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleSettingComponent } from './peddle-setting.component';

describe('PeddleSettingComponent', () => {
  let component: PeddleSettingComponent;
  let fixture: ComponentFixture<PeddleSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
