import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VegMenuComponent } from './veg-menu.component';

describe('VegMenuComponent', () => {
  let component: VegMenuComponent;
  let fixture: ComponentFixture<VegMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VegMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
