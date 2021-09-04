import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { IrisaDate } from '@arc.module/utilities/date-utility';

@Component({
  selector: 'date-time-picker-overlay-presenter',
  template: `<date-time-picker-overlay-view
    [label]="label"
    [buttonsLabel]="buttonsLabel"
    [placeholder]="placeholder"
    [selectedDate]="selectedDate"
    [showTime]="showTime"
    [locale]="locale"
    (onSelectedDate)="getSelectedDate($event)"
  ></date-time-picker-overlay-view>`,
})
export class DateTimePickerOverlayPresenter implements OnInit {
  @Output() onSelectedDate: EventEmitter<string | IrisaDate> = new EventEmitter<string | IrisaDate>();
  @Input() label = '';
  @Input() buttonsLabel: { submit: string, cancel: string };
  @Input() placeholder = '';
  @Input() showTime = false;
  // @Input() format = 'MM/DD/YYYY HH:mm:ss';
  private _locale: string = 'en'
  @Input() set locale(val: string) {
    this._locale = val;
  };

  get locale(): string {
    return this._locale;
  }

  private _selectedDate: IrisaDate | string;
  @Input() set selectedDate(val: IrisaDate | string) {
    this._selectedDate = val;
  };

  get selectedDate(): IrisaDate | string {
    return this._selectedDate;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedDate(selectedDate: string | IrisaDate) {
    this.onSelectedDate.emit(selectedDate)
  }
}
