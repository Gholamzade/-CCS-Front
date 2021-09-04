import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuAddEditModalView as SubmenuAddEditModalView } from './submenu-add-edit-modal-view';

describe('SubmenuAddEditModalView', () => {
  let component: SubmenuAddEditModalView;
  let fixture: ComponentFixture<SubmenuAddEditModalView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuAddEditModalView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuAddEditModalView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
