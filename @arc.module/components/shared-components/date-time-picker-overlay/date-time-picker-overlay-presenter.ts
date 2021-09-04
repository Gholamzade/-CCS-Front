import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { DateUtility, IrisaDate } from '@arc.module/utilities/date-utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'date-time-picker-overlay-presenter',
  template: `<date-time-picker-overlay-view
    [label]="label"
    [buttonsLabel]="buttonsLabel"
    [placeholder]="placeholder"
    [selectedDate]="data$|async"
    [showTime]="showTime"
    [locale]="locale"
    (onSelectedDate)="getSelectedDate($event)"
  ></date-time-picker-overlay-view>`,
})
export class DateTimePickerOverlayPresenter implements OnInit {
  @Output() selectedDateChange: EventEmitter<IrisaDate> = new EventEmitter<IrisaDate>();
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

  data$: Subject<IrisaDate | string> = new Subject<IrisaDate | string>()

  private _selectedDate: IrisaDate | string;
  @Input() set selectedDate(val: IrisaDate | string) {
    this._selectedDate = val;
    this.data$.next(val)
  };

  get selectedDate() {
    return this.parseInputDate(this._selectedDate);
  }

  parseInputDate(selectedDate) {
    let dateObject
    if (typeof selectedDate === 'string') {
      //converted string to IrisaDate
      if (this.locale === 'fa') {
        dateObject = DateUtility.stringTojalali(selectedDate)
      } else if (this.locale === 'en') {
        dateObject = DateUtility.stringToMiladi(selectedDate)
      }
    }
    else if (this.selectedDate instanceof IrisaDate) {
      if (this.locale === 'fa') {
        dateObject = selectedDate.toJalali();
      } else if (this.locale === 'en') {
        dateObject = selectedDate.toMiladi();
      }

    }
    else {
      dateObject = undefined
    }
    return dateObject
  }

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedDate(selectedDate: IrisaDate) {
    this.selectedDateChange.emit(selectedDate)
  }
}
