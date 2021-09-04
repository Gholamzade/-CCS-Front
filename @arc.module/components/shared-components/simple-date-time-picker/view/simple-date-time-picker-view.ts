import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERN_INPUT_HOUR, PATTERN_INPUT_MINUTE, PATTERN_INPUT_SECOND } from "@arc.module/constants/date-time-patterns";
import { BreakPointsService } from "@arc.module/services/break-points.service";
import { DateUtility, IrisaDate } from "@arc.module/utilities/date-utility";

@Component({
  selector: "simple-date-time-picker-view",
  templateUrl: "./simple-date-time-picker-view.html",
  styleUrls: ["./simple-date-time-picker-view.scss"]
})
export class SimpleDateTimePickerView implements OnInit {
  dateForm: FormGroup = new FormGroup({
    yearControl: new FormControl(null, [Validators.required]),
    monthControl: new FormControl(null, [Validators.required]),
    dayControl: new FormControl(null, [Validators.required]),
    hourControl: new FormControl(0, [Validators.required, Validators.pattern(PATTERN_INPUT_HOUR)]),
    minuteControl: new FormControl(0, [Validators.required, Validators.pattern(PATTERN_INPUT_MINUTE)]),
    secondControl: new FormControl(0, [Validators.required, Validators.pattern(PATTERN_INPUT_SECOND)])
  })

  get yearControl() {
    return this.dateForm.get('yearControl')
  }
  get monthControl() {
    return this.dateForm.get('monthControl')
  }
  get dayControl() {
    return this.dateForm.get('dayControl')
  }
  get hourControl() {
    return this.dateForm.get('hourControl')
  }
  get minuteControl() {
    return this.dateForm.get('minuteControl')
  }
  get secondControl() {
    return this.dateForm.get('secondControl')
  }

  @Output('selectedDateChange') selectedDateChange = new EventEmitter<IrisaDate>();
  @Output('monthChange') onMonthChange = new EventEmitter<number>();
  @Output('on-close') onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled: boolean;
  @Input() dir: string;
  @Input() showTime: boolean;
  private _locale: string
  @Input() public set locale(v: string) {
    this._locale = v;
  }

  public get locale(): string {
    return this._locale;
  }


  private _buttonsLabel: { submit: string, cancel: string } = {
    cancel: 'Cancel',
    submit: 'Submit'
  }
  @Input() set buttonsLabel(val: { submit: string, cancel: string }) {
    if (val)
      this._buttonsLabel = val;
  }
  get buttonsLabel() {
    return this._buttonsLabel;
  }
  private _dateObject: IrisaDate
  @Input() set dateObject(val: IrisaDate) {
    if (val) {
      this.changeMonth(val.month)

      this.dayControl.setValue(val.day);
      this.monthControl.setValue(val.month);
      this.yearControl.setValue(val.year);
      this.hourControl.setValue(val.hour ? val.hour : 0);
      this.minuteControl.setValue(val.minute ? val.minute : 0);
      this.secondControl.setValue(val.second ? val.second : 0);
    }
  }

  get dateObject(): IrisaDate {
    return this._dateObject;
  }

  private _days: number[];
  @Input() get days(): number[] {
    return this._days;
  }
  set days(value: number[]) {
    if (value) {
      this._days = value;
    }
  }


  private _months: { name: string, value: number, dayCount: number }[]
  @Input() set months(v: { name: string, value: number, dayCount: number }[]) {
    if (v) {
      this._months = v;
    }
  }

  get months(): { name: string, value: number, dayCount: number }[] {
    return this._months;
  }

  private _years: number[]
  @Input() set years(v: number[]) {
    this._years = v;
  }
  get years(): number[] {
    return this._years;
  }

  constructor(
    public breakPointService: BreakPointsService,
  ) { }

  changeMonth(selectedMonth: number) {
    this.onMonthChange.emit(selectedMonth)
  }

  ngOnInit() { }

  close() {
    this.onClose.emit()
  }

  setNow() {
    this.dateObject = new IrisaDate(this.locale)
  }

  submit() {
    if (!this.showTime) {
      this.hourControl.setValue(0);
      this.minuteControl.setValue(0);
      this.secondControl.setValue(0);
    }
    let irisaDate = DateUtility.createDate(this.yearControl.value, this.monthControl.value, this.dayControl.value,
      this.hourControl.value, this.minuteControl.value, this.secondControl.value, this.locale)
    this.selectedDateChange.emit(irisaDate)
  }


}


