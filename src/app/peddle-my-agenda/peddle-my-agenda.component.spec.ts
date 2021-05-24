import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddleMyAgendaComponent } from './peddle-my-agenda.component';

describe('PeddleMyAgendaComponent', () => {
  let component: PeddleMyAgendaComponent;
  let fixture: ComponentFixture<PeddleMyAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeddleMyAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeddleMyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
