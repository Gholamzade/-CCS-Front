import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupSelectorView } from './user-group-selector-view';

describe('UserGroupSelectorView', () => {
  let component: UserGroupSelectorView;
  let fixture: ComponentFixture<UserGroupSelectorView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupSelectorView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupSelectorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
