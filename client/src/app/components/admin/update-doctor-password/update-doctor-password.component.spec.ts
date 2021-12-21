import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorPasswordComponent } from './update-doctor-password.component';

describe('UpdateDoctorPasswordComponent', () => {
  let component: UpdateDoctorPasswordComponent;
  let fixture: ComponentFixture<UpdateDoctorPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDoctorPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
