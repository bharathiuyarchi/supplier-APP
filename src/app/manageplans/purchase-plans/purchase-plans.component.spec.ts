import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePlansComponent } from './purchase-plans.component';

describe('PurchasePlansComponent', () => {
  let component: PurchasePlansComponent;
  let fixture: ComponentFixture<PurchasePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
