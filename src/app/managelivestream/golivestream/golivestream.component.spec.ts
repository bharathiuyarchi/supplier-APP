import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolivestreamComponent } from './golivestream.component';

describe('GolivestreamComponent', () => {
  let component: GolivestreamComponent;
  let fixture: ComponentFixture<GolivestreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolivestreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GolivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
