import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPlantDetailsComponent } from './client-plant-details.component';

describe('ClientPlantDetailsComponent', () => {
  let component: ClientPlantDetailsComponent;
  let fixture: ComponentFixture<ClientPlantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPlantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPlantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
