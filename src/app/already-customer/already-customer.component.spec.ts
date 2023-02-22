import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyCustomerComponent } from './already-customer.component';

describe('AlreadyCustomerComponent', () => {
  let component: AlreadyCustomerComponent;
  let fixture: ComponentFixture<AlreadyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
