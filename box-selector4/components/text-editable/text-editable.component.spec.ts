import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditableComponent } from './text-editable.component';

describe('TextEditableComponent', () => {
  let component: TextEditableComponent;
  let fixture: ComponentFixture<TextEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
