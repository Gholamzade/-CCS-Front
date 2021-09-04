import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAddEditView } from './report-add-edit-view';

describe('ReportAddEditView', () => {
  let component: ReportAddEditView;
  let fixture: ComponentFixture<ReportAddEditView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAddEditView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAddEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
