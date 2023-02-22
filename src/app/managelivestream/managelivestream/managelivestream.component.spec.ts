import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelivestreamComponent } from './managelivestream.component';

describe('ManagelivestreamComponent', () => {
  let component: ManagelivestreamComponent;
  let fixture: ComponentFixture<ManagelivestreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagelivestreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
