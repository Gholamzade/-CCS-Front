import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDetailView } from './alert-detail-view';

describe('AlertDetailView', () => {
  let component: AlertDetailView;
  let fixture: ComponentFixture<AlertDetailView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDetailView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDetailView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
