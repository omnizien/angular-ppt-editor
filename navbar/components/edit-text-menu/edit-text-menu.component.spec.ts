import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextMenuComponent } from './edit-text-menu.component';

describe('EditTextMenuComponent', () => {
  let component: EditTextMenuComponent;
  let fixture: ComponentFixture<EditTextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
