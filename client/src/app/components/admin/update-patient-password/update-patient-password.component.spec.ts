import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientPasswordComponent } from './update-patient-password.component';

describe('UpdatePatientPasswordComponent', () => {
  let component: UpdatePatientPasswordComponent;
  let fixture: ComponentFixture<UpdatePatientPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePatientPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
