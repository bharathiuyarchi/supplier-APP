import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyCostomerSetPasswordComponent } from './already-costomer-set-password.component';

describe('AlreadyCostomerSetPasswordComponent', () => {
  let component: AlreadyCostomerSetPasswordComponent;
  let fixture: ComponentFixture<AlreadyCostomerSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyCostomerSetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyCostomerSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
