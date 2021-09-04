import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramBodyView } from './telegram-body-view';

describe('TelegramBodyView', () => {
  let component: TelegramBodyView;
  let fixture: ComponentFixture<TelegramBodyView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramBodyView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramBodyView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
