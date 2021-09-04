import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramEditView } from './telegram-edit-view';

describe('TelegramEditView', () => {
  let component: TelegramEditView;
  let fixture: ComponentFixture<TelegramEditView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramEditView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
