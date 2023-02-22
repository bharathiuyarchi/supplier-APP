import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsetTwoComponent } from './requestset-two.component';

describe('RequestsetTwoComponent', () => {
  let component: RequestsetTwoComponent;
  let fixture: ComponentFixture<RequestsetTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsetTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsetTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
