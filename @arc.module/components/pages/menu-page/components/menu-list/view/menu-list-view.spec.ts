import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListView } from './menu-list-view';

describe('MenuListView', () => {
  let component: MenuListView;
  let fixture: ComponentFixture<MenuListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
