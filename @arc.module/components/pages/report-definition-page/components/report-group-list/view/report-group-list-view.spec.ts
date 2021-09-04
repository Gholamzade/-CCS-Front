import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGroupListView } from './report-group-list-view';

describe('ReportGroupListView', () => {
  let component: ReportGroupListView;
  let fixture: ComponentFixture<ReportGroupListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGroupListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGroupListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
