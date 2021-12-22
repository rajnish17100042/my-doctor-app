import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedPatientsComponent } from './visited-patients.component';

describe('VisitedPatientsComponent', () => {
  let component: VisitedPatientsComponent;
  let fixture: ComponentFixture<VisitedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
