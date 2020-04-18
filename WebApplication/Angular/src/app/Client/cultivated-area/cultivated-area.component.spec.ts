import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivatedAreaComponent } from './cultivated-area.component';

describe('CultivatedAreaComponent', () => {
  let component: CultivatedAreaComponent;
  let fixture: ComponentFixture<CultivatedAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultivatedAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivatedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
