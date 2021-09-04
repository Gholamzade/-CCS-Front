import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramGridView } from './telegram-grid-view';

describe('TelegramGridView', () => {
  let component: TelegramGridView;
  let fixture: ComponentFixture<TelegramGridView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramGridView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramGridView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
