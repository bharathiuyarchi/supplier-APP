import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceDeatailsComponent } from './advance-deatails.component';

describe('AdvanceDeatailsComponent', () => {
  let component: AdvanceDeatailsComponent;
  let fixture: ComponentFixture<AdvanceDeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceDeatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
