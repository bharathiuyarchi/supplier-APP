import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagealertstreamComponent } from './managealertstream.component';

describe('ManagealertstreamComponent', () => {
  let component: ManagealertstreamComponent;
  let fixture: ComponentFixture<ManagealertstreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagealertstreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagealertstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
