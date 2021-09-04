import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuListView } from './submenu-list-view';

describe('SubmenuListView', () => {
  let component: SubmenuListView;
  let fixture: ComponentFixture<SubmenuListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
