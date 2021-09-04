import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { LanguageService } from "@arc.module/services/language.service";
import { DateUtility, IrisaDate } from "@arc.module/utilities/date-utility";


@Component({
  selector: "simple-simple-date-time-picker-presenter",
  template: `<simple-date-time-picker-view
  [years]="years"
  [months]="months"
  [days]="days"
  (selectedDateChange)="selectedDateChange($event)"
  (monthChange)="calcDays($event)"
  (on-close)="onClose()"
  [disabled]="disabled"
  [locale]="locale"
  [buttonsLabel]="buttonsLabel"
  [dateObject]="dateObject"
  [dateChange]="dateChange"
  [showTime]="showTime"
  [dir]="dir"
  ></simple-date-time-picker-view>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpleDateTimePickerPresenter implements OnInit {

  @Output() dateChange = new EventEmitter<string | IrisaDate>();
  @Output('on-close') onCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  private _selectedDate: IrisaDate | string
  selectedYear: number;
  dir: string;
  @Input() set selectedDate(val: IrisaDate | string) {

    if (val) {
      this._selectedDate = val
      this.parseInputDate().then(selectedYear => {
        this.initValues(selectedYear)
      })
    }
  };

  get selectedDate() {
    return this._selectedDate
  }

  @Input() disabled;
  @Input() showTime;
  @Input() buttonsLabel: { submit: string, cancel: string }
  @Input() dateObject: IrisaDate;


  months: { name: string, value: number, dayCount: number }[] = [];
  years: number[]

  selectedDateChange(selectedDate: string | IrisaDate) {
    this.dateChange.emit(selectedDate)
  }

  @Input() label: string = ''
  private _locale: string
  @Input() public set locale(v: string) {
    if (v) {
      this._locale = v;
      this.dateIntance = new IrisaDate(v)
    }
  }

  public get locale(): string {
    return this._locale;
  }

  dateIntance: IrisaDate
  @Input() placeholder: string = ''
  days: number[] = []


  constructor(
    private languageService: LanguageService
  ) {
    this.dir = languageService.getDirection()
  }

  createRange(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  }

  initValues(selectedYear) {
    this.years = this.createRange(this.dateIntance.year + 3, this.dateIntance.year - 10, -1)
    let months = this.dateIntance.getMonths()
    months.forEach((month: string, index: number) => {
      this.months.push({
        value: index + 1,
        name: month,
        dayCount: DateUtility.getNumDaysInMonth(this.locale, selectedYear, index)
      })
    })


  }


  parseInputDate() {

    if (typeof this.selectedDate === 'string') {
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

    else {
      this.dateObject = undefined

    }

    this.selectedYear = this.dateObject?.year

    return Promise.resolve(this.selectedYear)
  }

  async ngOnInit() {
    this.parseInputDate().then(selectedYear => {
      this.initValues(selectedYear)
    })

  }

  onClose() {
    this.onCloseEvent.emit()
  }

  calcDays(monthNumber: number) {
    const month = this.months.find(m => m.value === monthNumber)
    this.days = [...Array.from({ length: month.dayCount }, (_, i) => i + 1)];
  }

}
