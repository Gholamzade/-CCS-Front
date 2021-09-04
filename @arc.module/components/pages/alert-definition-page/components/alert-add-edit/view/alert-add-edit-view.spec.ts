import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddEditView } from './alert-add-edit-view';

describe('AlertAddEditView', () => {
  let component: AlertAddEditView;
  let fixture: ComponentFixture<AlertAddEditView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertAddEditView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
