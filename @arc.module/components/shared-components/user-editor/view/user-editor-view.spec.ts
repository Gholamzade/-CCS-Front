import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorView } from './user-editor-view';

describe('UserEditorView', () => {
  let component: UserEditorView;
  let fixture: ComponentFixture<UserEditorView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditorView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
