import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramModificationPageView } from './telegram-modification-page-view';

describe('TelegramModificationPageView', () => {
  let component: TelegramModificationPageView;
  let fixture: ComponentFixture<TelegramModificationPageView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramModificationPageView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramModificationPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
