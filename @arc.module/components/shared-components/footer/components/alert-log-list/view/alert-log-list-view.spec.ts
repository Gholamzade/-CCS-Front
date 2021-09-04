import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLogListView } from './alert-log-list-view';

describe('AlertLogListView', () => {
  let component: AlertLogListView;
  let fixture: ComponentFixture<AlertLogListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertLogListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLogListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
