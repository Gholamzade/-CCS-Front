import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IrisaDate } from '@arc.module/utilities/date-utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'irisa-date-time-picker-presenter',
  template: `<irisa-date-time-picker-view
    [label]="label"
    [buttonsLabel]="buttonsLabel"
    [placeholder]="placeholder"
    [selectedDate]="data$|async"
    [showTime]="showTime"
    [locale]="locale"
    (onSelectedDate)="getSelectedDate($event)"
  ></irisa-date-time-picker-view>`,
})
export class IrisaDateTimePickerPresenter implements OnInit {

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

  get selectedDate(): IrisaDate | string {
    return this._selectedDate;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedDate(selectedDate: IrisaDate) {
    // console.warn('selectedDate: ', selectedDate);
    this.selectedDateChange.emit(selectedDate)
  }
}


