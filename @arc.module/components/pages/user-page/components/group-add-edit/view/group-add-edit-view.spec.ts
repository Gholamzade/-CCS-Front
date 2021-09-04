import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddEditModalView } from './group-add-edit-view';

describe('GroupAddEditModalView', () => {
  let component: GroupAddEditModalView;
  let fixture: ComponentFixture<GroupAddEditModalView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddEditModalView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddEditModalView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
