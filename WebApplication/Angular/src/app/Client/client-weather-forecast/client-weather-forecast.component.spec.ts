import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWeatherForecastComponent } from './client-weather-forecast.component';

describe('ClientWeatherForecastComponent', () => {
  let component: ClientWeatherForecastComponent;
  let fixture: ComponentFixture<ClientWeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWeatherForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
