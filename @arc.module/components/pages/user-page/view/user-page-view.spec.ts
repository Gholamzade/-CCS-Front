import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageView } from './user-page-view';

describe('UserPageView', () => {
  let component: UserPageView;
  let fixture: ComponentFixture<UserPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
