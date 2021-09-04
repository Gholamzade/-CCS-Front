import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnInit } from "@angular/core";
import * as jalaliMoment from "jalali-moment";
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: "date-time-picker-presenter",
  template: `<date-time-picker-view
  [selectedDate]="_selectedDate"
  (selectedDateChange)="selectedDateChange($event)"
  (on-close)="onClose()"
  [disabled]="disabled"
  [showTime]="showTime"
  ></date-time-picker-view>`,
})
export class DateTimePickerPresenter implements OnInit {
  tempDate = new Date();

  _selectedDate: Date | jalaliMoment.Moment
  @Input('selectedDate') set selectedDate(val: Date | jalaliMoment.Moment) {
    if (val) {
      this._selectedDate = val
    }
    else {
      if (this.locale === 'fa') {
        this._selectedDate = jalaliMoment().locale("fa")
      } else {
        this._selectedDate = new Date()
      }
    }
  };

  // get selectedDate(): Date | jalaliMoment.Moment {
  //   return this._selectedDate;
  // }

  @Output() dateChange = new EventEmitter<Date | jalaliMoment.Moment>();
  @Output('on-close') onCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() disabled = false;
  @Input() showTime = true;

  selectedDateChange(selectedDate: Date | jalaliMoment.Moment) {
    console.warn("selectedDateChange", selectedDate)
    this.dateChange.emit(selectedDate)
  }

  @Input() label: string = ''
  @Input() placeholder: string = ''

  constructor(@Inject(LOCALE_ID) public locale: string) {

  }

  ngOnInit() {
    // console.warn("locale", this.locale)
    // console.warn("this._selectedDate", this._selectedDate)
    // if (this.locale === 'fa' && this._selectedDate === undefined) {
    //   this._selectedDate = jalaliMoment().locale("fa");
    // } else {
    //   this._selectedDate = new Date()
    // }
  }

  onClose() {
    this.onCloseEvent.emit()
  }

}


