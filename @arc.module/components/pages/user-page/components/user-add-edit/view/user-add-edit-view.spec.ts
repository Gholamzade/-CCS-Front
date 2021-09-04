import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEditView } from './user-add-edit-view';

describe('UserAddEditView', () => {
  let component: UserAddEditView;
  let fixture: ComponentFixture<UserAddEditView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddEditView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
