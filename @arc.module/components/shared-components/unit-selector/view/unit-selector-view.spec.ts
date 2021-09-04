import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSelectorView } from './unit-selector-view';

describe('UnitSelectorView', () => {
  let component: UnitSelectorView;
  let fixture: ComponentFixture<UnitSelectorView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitSelectorView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSelectorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
