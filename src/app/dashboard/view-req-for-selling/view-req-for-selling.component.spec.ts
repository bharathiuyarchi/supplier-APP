import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReqForSellingComponent } from './view-req-for-selling.component';

describe('ViewReqForSellingComponent', () => {
  let component: ViewReqForSellingComponent;
  let fixture: ComponentFixture<ViewReqForSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReqForSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReqForSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
