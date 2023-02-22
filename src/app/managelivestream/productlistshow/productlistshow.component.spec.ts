import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistshowComponent } from './productlistshow.component';

describe('ProductlistshowComponent', () => {
  let component: ProductlistshowComponent;
  let fixture: ComponentFixture<ProductlistshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistshowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
