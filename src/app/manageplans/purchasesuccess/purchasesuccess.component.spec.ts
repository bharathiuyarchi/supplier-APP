import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesuccessComponent } from './purchasesuccess.component';

describe('PurchasesuccessComponent', () => {
  let component: PurchasesuccessComponent;
  let fixture: ComponentFixture<PurchasesuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
