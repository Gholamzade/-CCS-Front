import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDefinitionPageView } from './report-definition-page-view';

describe('ReportDefinitionPageView', () => {
  let component: ReportDefinitionPageView;
  let fixture: ComponentFixture<ReportDefinitionPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDefinitionPageView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDefinitionPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
