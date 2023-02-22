import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamchatComponent } from './streamchat.component';

describe('StreamchatComponent', () => {
  let component: StreamchatComponent;
  let fixture: ComponentFixture<StreamchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
