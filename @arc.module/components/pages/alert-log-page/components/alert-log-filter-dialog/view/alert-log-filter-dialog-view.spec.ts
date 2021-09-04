import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLogFilterDialogView } from './alert-log-filter-dialog-view';

describe('AlertLogFilterDialogView', () => {
  let component: AlertLogFilterDialogView;
  let fixture: ComponentFixture<AlertLogFilterDialogView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertLogFilterDialogView]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLogFilterDialogView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
