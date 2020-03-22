import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceVariationComponent } from './price-variation.component';

describe('PriceVariationComponent', () => {
  let component: PriceVariationComponent;
  let fixture: ComponentFixture<PriceVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
