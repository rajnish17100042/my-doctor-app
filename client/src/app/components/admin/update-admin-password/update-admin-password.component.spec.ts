import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminPasswordComponent } from './update-admin-password.component';

describe('UpdateAdminPasswordComponent', () => {
  let component: UpdateAdminPasswordComponent;
  let fixture: ComponentFixture<UpdateAdminPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
