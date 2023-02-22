import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdvanceDetailsComponent } from './display-advance-details.component';

describe('DisplayAdvanceDetailsComponent', () => {
  let component: DisplayAdvanceDetailsComponent;
  let fixture: ComponentFixture<DisplayAdvanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdvanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAdvanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
