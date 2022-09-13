import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableObjectsComponent } from './movable-objects.component';

describe('MovableObjectsComponent', () => {
  let component: MovableObjectsComponent;
  let fixture: ComponentFixture<MovableObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovableObjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovableObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
