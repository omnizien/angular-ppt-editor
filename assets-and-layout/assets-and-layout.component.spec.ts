import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAndLayoutComponent } from './assets-and-layout.component';

describe('AssetsAndLayoutComponent', () => {
  let component: AssetsAndLayoutComponent;
  let fixture: ComponentFixture<AssetsAndLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsAndLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsAndLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
