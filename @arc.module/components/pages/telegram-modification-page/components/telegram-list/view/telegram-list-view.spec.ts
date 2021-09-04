import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramListView } from './telegram-list-view';

describe('TelegramListView', () => {
  let component: TelegramListView;
  let fixture: ComponentFixture<TelegramListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
