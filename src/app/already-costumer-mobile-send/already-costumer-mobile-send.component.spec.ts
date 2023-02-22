import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyCostumerMobileSendComponent } from './already-costumer-mobile-send.component';

describe('AlreadyCostumerMobileSendComponent', () => {
  let component: AlreadyCostumerMobileSendComponent;
  let fixture: ComponentFixture<AlreadyCostumerMobileSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyCostumerMobileSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyCostumerMobileSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
