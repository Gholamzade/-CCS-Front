import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResponseDataView } from './edit-response-data-view';

describe('EditResponseDataView', () => {
  let component: EditResponseDataView;
  let fixture: ComponentFixture<EditResponseDataView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResponseDataView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResponseDataView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
