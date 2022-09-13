import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDialerComponent } from './number-dialer.component';

describe('NumberDialerComponent', () => {
  let component: NumberDialerComponent;
  let fixture: ComponentFixture<NumberDialerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberDialerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
