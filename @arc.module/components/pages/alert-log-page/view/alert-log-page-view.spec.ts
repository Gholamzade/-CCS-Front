import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLogPageView } from './alert-log-page-view';

describe('AlertLogPageView', () => {
  let component: AlertLogPageView;
  let fixture: ComponentFixture<AlertLogPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertLogPageView]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLogPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
