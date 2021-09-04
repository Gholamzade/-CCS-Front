import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListView } from './report-list-view';

describe('ReportListView', () => {
  let component: ReportListView;
  let fixture: ComponentFixture<ReportListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
