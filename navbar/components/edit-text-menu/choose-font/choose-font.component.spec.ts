import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFontComponent } from './choose-font.component';

describe('TextEditComponent', () => {
  let component: ChooseFontComponent;
  let fixture: ComponentFixture<ChooseFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
