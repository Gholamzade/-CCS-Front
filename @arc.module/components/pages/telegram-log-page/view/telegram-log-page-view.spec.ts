import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramLogPageView } from './telegram-log-page-view';

describe('TelegramLogPageView', () => {
  let component: TelegramLogPageView;
  let fixture: ComponentFixture<TelegramLogPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramLogPageView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramLogPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
