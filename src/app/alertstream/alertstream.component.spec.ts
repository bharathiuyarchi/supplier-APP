import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertstreamComponent } from './alertstream.component';

describe('AlertstreamComponent', () => {
  let component: AlertstreamComponent;
  let fixture: ComponentFixture<AlertstreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertstreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
