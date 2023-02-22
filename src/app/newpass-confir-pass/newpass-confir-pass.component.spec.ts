import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpassConfirPassComponent } from './newpass-confir-pass.component';

describe('NewpassConfirPassComponent', () => {
  let component: NewpassConfirPassComponent;
  let fixture: ComponentFixture<NewpassConfirPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpassConfirPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpassConfirPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
