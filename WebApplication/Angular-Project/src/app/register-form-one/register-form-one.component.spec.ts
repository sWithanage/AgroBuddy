import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormOneComponent } from './register-form-one.component';

describe('RegisterFormOneComponent', () => {
  let component: RegisterFormOneComponent;
  let fixture: ComponentFixture<RegisterFormOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
