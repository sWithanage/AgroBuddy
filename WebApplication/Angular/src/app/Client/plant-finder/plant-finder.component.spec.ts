import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantFinderComponent } from './plant-finder.component';

describe('PlantFinderComponent', () => {
  let component: PlantFinderComponent;
  let fixture: ComponentFixture<PlantFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
