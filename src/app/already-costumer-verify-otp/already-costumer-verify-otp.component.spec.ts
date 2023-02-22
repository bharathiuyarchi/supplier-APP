import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyCostumerVerifyOtpComponent } from './already-costumer-verify-otp.component';

describe('AlreadyCostumerVerifyOtpComponent', () => {
  let component: AlreadyCostumerVerifyOtpComponent;
  let fixture: ComponentFixture<AlreadyCostumerVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyCostumerVerifyOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyCostumerVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
