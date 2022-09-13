import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEditableComponent } from './background-editable.component';

describe('BackgroundEditableComponent', () => {
  let component: BackgroundEditableComponent;
  let fixture: ComponentFixture<BackgroundEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
