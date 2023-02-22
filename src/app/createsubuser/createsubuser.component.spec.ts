import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesubuserComponent } from './createsubuser.component';

describe('CreatesubuserComponent', () => {
  let component: CreatesubuserComponent;
  let fixture: ComponentFixture<CreatesubuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesubuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesubuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
