import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramFilterView } from './telegram-filter-view';

describe('TelegramFilterView', () => {
  let component: TelegramFilterView;
  let fixture: ComponentFixture<TelegramFilterView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramFilterView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramFilterView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
