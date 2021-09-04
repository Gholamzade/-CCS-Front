import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAlertView } from './popup-alert-view';

describe('PopupAlertView', () => {
  let component: PopupAlertView;
  let fixture: ComponentFixture<PopupAlertView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAlertView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAlertView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
