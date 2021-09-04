import { Overlay, } from '@angular/cdk/overlay';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy, ViewContainerRef, LOCALE_ID } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ITelegramLogFilter } from '@arc.module/models/interfaces/telegram-log-filter.interface';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { IUnit } from '@arc.module/models/interfaces/unit.interface';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { DateUtility, IrisaDate } from '@arc.module/utilities/date-utility';
import { JALALI_DATE_FORMATS, MaterialJalaliDateAdapter } from '@arc.module/utilities/material.jalali-date.adapter';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'telegram-filter-view',
  templateUrl: './telegram-filter-view.html',
  styleUrls: ['./telegram-filter-view.scss'],
  // providers: [
  //   {
  //     provide: NgxMatDateAdapter,
  //     useClass: NgxMaterialJalaliDateAdapter,
  //     deps: [MAT_DATE_LOCALE],
  //   },
  //   { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_JALALI_DATE_FORMATS }
  // ],
})
export class TelegramFilterView implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  timer;
  lastFilters: ITelegramLogFilter
  // startDate = new FormControl();
  // endDate = new FormControl();
  private _telegrams: ITelegram[] = []
  @Input() set telegrams(val: ITelegram[]) {
    if (val) {
      val.forEach(element => {
        this._telegrams.push({
          ...element,
          idWithName: element.telegramId + ' - ' + element.name
        })
      });
      this.filteredResponseTelegrams$.next(this._telegrams)
      this.filteredRequestTelegrams$.next(this._telegrams)
      this.filteredResponseTelegrams = this._telegrams
      this.filteredRequestTelegrams = this._telegrams
    }

  };

  get telegrams(): ITelegram[] {
    return this._telegrams
  }

  filteredRequestTelegrams$: Subject<ITelegram[]> = new Subject<ITelegram[]>();
  filteredRequestTelegrams: ITelegram[] = []
  requestTelegramControl = new FormControl();

  filteredResponseTelegrams$: Subject<ITelegram[]> = new Subject<ITelegram[]>();
  filteredResponseTelegrams: ITelegram[] = []
  responseTelegramControl = new FormControl();

  minDate: Date;
  maxDate: Date;
  selectedRequestTelegramIds: number[];
  selectedResponseTelegramIds: number[];
  selectedReciver: number;
  selectedSender: number;
  selectedHour?: number;

  selectedFrom: IrisaDate | string

  selectedTo: IrisaDate | string

  selectedTimeTo: string = null;
  autoRefresh: boolean = false;

  @Input() units: IUnit[]
  @Input() lastHours: Number[];
  @Output() filterClick = new EventEmitter<ITelegramLogFilter>();

  constructor(
    public breakPointService: BreakPointsService,
    public overlay: Overlay, public viewContainerRef: ViewContainerRef
  ) {

    const todaysDate = new Date();
    this.minDate = new Date(todaysDate.getFullYear() - 5, 0, 1);
    this.maxDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate());

  }


  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.saerchOnTelegramList();

    this.timer = setInterval(() => {
      if (this.autoRefresh) {
        this.filterClick.emit(this.lastFilters);
      }
    }, 5000)
  }


  onCheckedAll(event: MatCheckboxChange, type: 'response' | 'request') {
    console.warn(event)
    if (event.checked) {
      if (type === 'request')
        this.selectedRequestTelegramIds = this.filteredRequestTelegrams.map(item => item.telegramId)
      if (type === 'response')
        this.selectedResponseTelegramIds = this.filteredResponseTelegrams.map(item => item.telegramId)
    } else {
      if (type === 'request')
        this.selectedRequestTelegramIds = []

      if (type === 'response')
        this.selectedResponseTelegramIds = []
    }
  }

  private _filterTelegramName(value: string): ITelegram[] {
    const filterValue = value ? value.toLowerCase() : null;
    if (this.telegrams) {
      return this.telegrams.filter(x => x.idWithName.toLowerCase().includes(filterValue));
    } else {
      return []
    }
  }

  saerchOnTelegramList() {
    this.requestTelegramControl.valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.destroy)
      ).subscribe(value => {
        let searchResult = value || '' ? this._filterTelegramName(value) : this.telegrams.slice()
        this.filteredRequestTelegrams$.next(searchResult)
        this.filteredRequestTelegrams = searchResult

      });

    this.responseTelegramControl.valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.destroy)
      ).subscribe(value => {
        let searchResult = value || '' ? this._filterTelegramName(value) : this.telegrams.slice()
        this.filteredResponseTelegrams$.next(searchResult)
        this.filteredResponseTelegrams = searchResult
      });
  }

  getSelectedStartDate(startDate: string | IrisaDate) {
    this.selectedFrom = startDate
  }
  getSelectedEndDate(endDate: string | IrisaDate) {
    this.selectedTo = endDate
  }


  selectedHourChanged() {
    if (this.selectedHour) {
      const now = new Date();
      let fromTime = new Date((new Date()).setHours(now.getHours() - this.selectedHour))
      let toTime = new Date(((new Date()).setHours(now.getHours() + this.selectedHour)))
      this.selectedFrom = DateUtility.toApiDate(fromTime, "YYYY/MM/DD HH:mm:ss")
      this.selectedTo = DateUtility.toApiDate(toTime, "YYYY/MM/DD HH:mm:ss")
    }
  }

  clearForm() {
    //this.selectedTelegrams = [];
    this.selectedReciver = null;
    this.selectedSender = null;
    this.selectedFrom = null;
    this.selectedTo = null;
    this.selectedRequestTelegramIds = null;
    this.selectedResponseTelegramIds = null;
    this.selectedHour = null;
    // this.startDate.setValue(null)
    // this.endDate.setValue(null)
  }

  submitForm() {
    this.lastFilters = {
      direction: 1,
      lastLogId: 0,
      pageSize: 0,
      requestTelegramIds: this.selectedRequestTelegramIds,
      responseTelegramIds: this.selectedResponseTelegramIds,
      receiverFk: this.selectedReciver,
      senderFk: this.selectedSender,
      fromDate: this.selectedFrom ? DateUtility.toApiDate(this.selectedFrom) : null,
      toDate: this.selectedTo ? DateUtility.toApiDate(this.selectedTo) : null
    };
    this.filterClick.emit(this.lastFilters);

  }



}
