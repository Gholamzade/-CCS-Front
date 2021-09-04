import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSendView } from './alert-send-view';

describe('AlertSendView', () => {
  let component: AlertSendView;
  let fixture: ComponentFixture<AlertSendView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertSendView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSendView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
