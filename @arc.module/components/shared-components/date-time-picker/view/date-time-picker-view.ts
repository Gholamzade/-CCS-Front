import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import * as jalaliMoment from "jalali-moment";


export const PATTERN_INPUT_HOUR = /^(2[0-3]|[0-1][0-9]|[0-9])$/;
export const PATTERN_INPUT_MINUTE = /^([0-5][0-9]|[0-9])$/;
export const PATTERN_INPUT_SECOND = /^([0-5][0-9]|[0-9])$/;
export const LIMIT_TIMES = {
  minHour: 0,
  maxHour: 24,
  minMinute: 0,
  maxMinute: 60,
  minSecond: 0,
  maxSecond: 60,
}
export function formatTwoDigitTimeValue(val: number) {
  const txt = val.toString();
  return txt.length > 1 ? txt : `0${txt}`;
}

@Component({
  selector: "date-time-picker-view",
  templateUrl: "./date-time-picker-view.html",
  styleUrls: ["./date-time-picker-view.scss"]
})
export class DateTimePickerView implements OnInit {

  hourFormControl: FormControl = new FormControl(0, [Validators.required, Validators.pattern(PATTERN_INPUT_HOUR)])
  minuteFormControl: FormControl = new FormControl(0, [Validators.required, Validators.pattern(PATTERN_INPUT_MINUTE)])

  private _selectedDate: Date | jalaliMoment.Moment
  @Input() set selectedDate(val: Date | jalaliMoment.Moment) {
    // if (val) {
    this._selectedDate = val
    // }
    // else {
    //   if (jalaliMoment.isMoment(val)) {
    //     jalaliMoment.locale('fa');
    //     jalaliMoment().format();// it would be in jalali system
    //     this._selectedDate = this.clone(val);
    //   }
    // }
  };

  get selectedDate(): Date | jalaliMoment.Moment {
    return this._selectedDate;
  }

  @Output('selectedDateChange') selectedDateChange = new EventEmitter<Date | jalaliMoment.Moment>();
  @Output('on-close') onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled: boolean;
  @Input() showTime: boolean;

  constructor(
    public breakPointService: BreakPointsService,
    public dateAdapter: DateAdapter<jalaliMoment.Moment>,
  ) { }

  clone(date: jalaliMoment.Moment): jalaliMoment.Moment {
    return date.clone().locale("fa");
  }

  setDefaultDateTime() {
    let hours = this.getHours()
    let minutes = this.getMinute()
    this.hourFormControl.setValue(hours)
    this.minuteFormControl.setValue(minutes)
  }

  ngOnInit(): void {
    this.setDefaultDateTime()

    this.hourFormControl.valueChanges.pipe(

    ).subscribe(res => {
      let hour = 0
      if (!this.hourFormControl.invalid) {
        hour = res
      }
      this.setHours(hour)
    })

    this.minuteFormControl.valueChanges.pipe(

    ).subscribe(res => {
      let minute = 0
      if (!this.minuteFormControl.invalid) {
        minute = res
      }
      this.setMinute(minute);
      console.warn("minute", this.selectedDate)

    })
  }

  setMinute(minute: number) {

    if (jalaliMoment.isMoment(this.selectedDate)) {
      this.selectedDate.set('minutes', minute);
    } else {
      this.selectedDate.setMinutes(minute)
    }
  }

  setHours(hour: number) {
    if (jalaliMoment.isMoment(this.selectedDate)) {
      this.selectedDate.set('hours', hour);
    } else {
      this.selectedDate.setHours(hour)
    }
  }

  getMinute() {

    if (jalaliMoment.isMoment(this.selectedDate)) {
      return this.selectedDate.get('minutes');
    } else {
      return this.selectedDate.getMinutes()
    }
  }

  getHours() {
    console.warn(this.selectedDate, jalaliMoment.isMoment(this.selectedDate))
    if (jalaliMoment.isMoment(this.selectedDate)) {
      return this.selectedDate.get('hours');
    } else {
      return this.selectedDate.getHours()
    }
  }

  dateChanged(date: any) {

    console.warn(typeof date, date instanceof Date,)
    console.warn(this.dateAdapter.isDateInstance(date))
    console.warn(date)
    if (jalaliMoment.isMoment(date)) {
      if (this.showTime) {
        date.set('hours', this.hourFormControl.value)
        date.set('minutes', this.minuteFormControl.value)
      } else {
        date.set('hours', 0)
        date.set('minutes', 0)
      }

    } else {
      if (this.showTime) {
        date.setHours(this.hourFormControl.value)
        date.setMinutes(this.minuteFormControl.value)
      } else {
        date.setHours(0)
        date.setMinutes(0)
      }
    }

    // this.selectedDateChange.emit(this.selectedDate)
    // console.warn("date", this.selectedDate)
  }


  submit() {
    this.selectedDateChange.emit(this.selectedDate)
  }


  /** Change property of time */
  public change(prop: 'hour' | 'minute', up: boolean) {

    const next = this._getNextValueByProp(prop, up);
    if (prop == 'hour') {
      this.hourFormControl.setValue((next), { onlySelf: false, emitEvent: false });
    } else {
      this.minuteFormControl.setValue((next), { onlySelf: false, emitEvent: false });
    }
  }

  /**
     * Get next value by property
     * @param prop 
     * @param up
     */
  private _getNextValueByProp(prop: 'hour' | 'minute', up: boolean): number {
    const keyProp = prop[0].toUpperCase() + prop.slice(1);
    const min = LIMIT_TIMES[`min${keyProp}`];
    let max = LIMIT_TIMES[`max${keyProp}`];

    let next: number;
    let currentValue: number;
    if (prop === 'hour') {
      currentValue = this.hourFormControl.value
    } else {
      currentValue = this.minuteFormControl.value
    }
    next = up ? Number(currentValue + 1) : Number(currentValue - 1);
    return Number(next);
  }
}


