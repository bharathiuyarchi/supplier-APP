import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepostsComponent } from './manageposts.component';

describe('ManagepostsComponent', () => {
  let component: ManagepostsComponent;
  let fixture: ComponentFixture<ManagepostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
