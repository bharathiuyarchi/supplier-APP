import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateplanComponent } from './privateplan.component';

describe('PrivateplanComponent', () => {
  let component: PrivateplanComponent;
  let fixture: ComponentFixture<PrivateplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
