import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertListView } from './alert-list-view';

describe('AlertListView', () => {
  let component: AlertListView;
  let fixture: ComponentFixture<AlertListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
