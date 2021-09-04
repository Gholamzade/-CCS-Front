import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGroupAddEditView } from './report-group-add-edit-view';

describe('ReportGroupAddEditView', () => {
  let component: ReportGroupAddEditView;
  let fixture: ComponentFixture<ReportGroupAddEditView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGroupAddEditView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGroupAddEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
