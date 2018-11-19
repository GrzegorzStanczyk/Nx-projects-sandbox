import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Timer1Component } from './timer1.component';

describe('Timer1Component', () => {
  let component: Timer1Component;
  let fixture: ComponentFixture<Timer1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Timer1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Timer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
