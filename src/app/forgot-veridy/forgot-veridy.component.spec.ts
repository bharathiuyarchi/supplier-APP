import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotVeridyComponent } from './forgot-veridy.component';

describe('ForgotVeridyComponent', () => {
  let component: ForgotVeridyComponent;
  let fixture: ComponentFixture<ForgotVeridyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotVeridyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotVeridyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
