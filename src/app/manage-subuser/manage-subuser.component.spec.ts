import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubuserComponent } from './manage-subuser.component';

describe('ManageSubuserComponent', () => {
  let component: ManageSubuserComponent;
  let fixture: ComponentFixture<ManageSubuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
