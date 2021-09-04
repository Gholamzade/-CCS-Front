import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDefinitionPageView } from './alert-definition-page-view';

describe('AlertDefinitionPageView', () => {
  let component: AlertDefinitionPageView;
  let fixture: ComponentFixture<AlertDefinitionPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDefinitionPageView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDefinitionPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
