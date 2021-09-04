import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { DateUtility, IrisaDate } from "@arc.module/utilities/date-utility";


@Component({
  selector: "simple-simple-date-time-picker-presenter",
  template: `<simple-date-time-picker-view
  [years]="years"
  [months]="months"
  [days]="days"
  (selectedDateChange)="selectedDateChange($event)"
  (on-close)="onClose()"
  [disabled]="disabled"
  [locale]="locale"
  [buttonsLabel]="buttonsLabel"
  [dateObject]="dateObject"
  [dateChange]="dateChange"
  [showTime]="showTime"
  ></simple-date-time-picker-view>`,
})

export class SimpleDateTimePickerPresenter implements OnInit {

  @Output() dateChange = new EventEmitter<string | IrisaDate>();
  @Output('on-close') onCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  private _selectedDate: IrisaDate | string
  @Input() set selectedDate(val: IrisaDate | string) {
    this._selectedDate = val
    if (val) {
      this.parseInputDate()
    }
  };

  get selectedDate() {
    return this._selectedDate
  }

  @Input() disabled;
  @Input() showTime;
  @Input() buttonsLabel: { submit: string, cancel: string }
  @Input() dateObject: IrisaDate;

  days: number[]
  months: { name: string, value: number }[] = [];
  years: number[]

  selectedDateChange(selectedDate: string | IrisaDate) {
    this.dateChange.emit(selectedDate)
  }

  @Input() label: string = ''
  private _locale: string
  @Input() public set locale(v: string) {
    this._locale = v;
  }

  public get locale(): string {
    return this._locale;
  }


  @Input() placeholder: string = ''

  dateIntance: IrisaDate

  constructor() {

  }

  createRange(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  }

  initValues() {
    // console.warn(this.locale, this.dateIntance)
    this.years = this.createRange(this.dateIntance.year + 3, this.dateIntance.year - 10, -1)
    let months = this.dateIntance.getMonths()
    months.forEach((month: string, index: number) => {
      this.months.push({
        value: index + 1,
        name: month
      })
    })
    let dayCounts = this.dateIntance.getNumDaysInMonth()
    this.days = Array.from({ length: dayCounts }, (_, i) => i + 1);

  }


  parseInputDate() {

    if (typeof this.selectedDate === 'string') {
      console.log('selectedDate: ', this.selectedDate);
      //converted string to IrisaDate

      if (this.locale === 'fa') {
        this.dateObject = DateUtility.stringTojalali(this.selectedDate)
        // console.log('this.dateObject: ', this.dateObject);

      } else if (this.locale === 'en') {
        this.dateObject = DateUtility.stringToMiladi(this.selectedDate)
        // console.log('this.dateObject: ', this.dateObject);

      }

    }


    else if (this.selectedDate instanceof IrisaDate) {

      if (this.locale === 'fa') {
        this.dateObject = this.selectedDate.toJalali();

      } else if (this.locale === 'en') {
        this.dateObject = this.selectedDate.toMiladi();
      }

    }
    // else if (DateUtility.isDateObject((this.selectedDate))) {
    //   let day = this.selectedDate.getDay()
    //   let month = this.selectedDate.getMonth()
    //   let year = this.selectedDate.getDay()
    //   let hour = this.selectedDate.getHours()
    //   let minute = this.selectedDate.getMinutes()
    //   let second = this.selectedDate.getSeconds()
    //   this.dateObject = DateUtility.createDate(year, month, day, hour, minute, second, this.locale)
    // }
    else {
      this.dateObject = undefined

    }

  }

  async ngOnInit() {
    this.dateIntance = new IrisaDate(this.locale)

    this.initValues()

    this.parseInputDate()

  }

  onClose() {
    this.onCloseEvent.emit()
  }

}
