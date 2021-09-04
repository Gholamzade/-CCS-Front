import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';


import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { IAlertLogFilter } from '@arc.module/models/interfaces/alert-log-filter.interface';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';
import { Observable } from 'rxjs';
import { IrisaDate } from '@arc.module/utilities/date-utility';

@Component({
  selector: 'alert-log-filter-view',
  templateUrl: './alert-log-filter-view.html',
  styleUrls: ['./alert-log-filter-view.scss'],
})
export class AlertLogfilterView implements OnInit {
  private _alertList: IAlert[];
  @Input() set alertList(value: IAlert[]) {
    this._alertList = value;
    this.filteredAlertsById = this.alertIdCtrl.valueChanges.pipe(
      startWith(null),
      map((alert: string | null) => {
        if (typeof alert === "string") {
          if (this._isNumeric(alert))
            return alert ? this._filterAlertId(parseInt(alert)) : this._alertList;
          else {
            this.alertIdInput.nativeElement.value = '';
            this.alertIdCtrl.setValue(null);
            return this._alertList;
          }
        }
        else {
          return this._alertList;
        }
      })
    );

    this.filteredAlertsByTitle = this.alertTitleCtrl.valueChanges.pipe(
      startWith(null),
      map((alert: string | null) => {
        if (typeof alert === "string")
          return alert ? this._filterAlertTitle(alert) : this._alertList;
        else
          return this._alertList;
      })
    );
  }
  @Output() onSearchData: EventEmitter<IAlertLogFilter> = new EventEmitter<IAlertLogFilter>()
  @Input() alertTypeList
  @Input() datePeriods

  selectedAlerts: IAlert[] = [];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  alertIdCtrl = new FormControl();
  alertTitleCtrl = new FormControl();
  filteredAlertsById: Observable<IAlert[]>;
  filteredAlertsByTitle: Observable<IAlert[]>;

  @ViewChild('alertTitleInput') alertTitleInput: ElementRef<HTMLInputElement>;
  @ViewChild('alertIdInput') alertIdInput: ElementRef<HTMLInputElement>;


  panelOpenState = false;
  filterForm: FormGroup

  get alerts() { return this.filterForm.get('alerts') as FormArray; }
  get alertType() { return this.filterForm.get('alertType'); }
  get datePeriod() { return this.filterForm.get('datePeriod'); }
  get prm1() { return this.filterForm.get('prm1'); }
  get prm2() { return this.filterForm.get('prm2'); }
  get prm3() { return this.filterForm.get('prm3'); }
  get bodyPhrase() { return this.filterForm.get('bodyPhrase'); }
  get fromDate() { return this.filterForm.get('fromDate'); }
  get toDate() { return this.filterForm.get('toDate'); }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm()
  }

  getSelectedStartDate(startDate: string | IrisaDate) {
    this.fromDate.setValue(startDate?.toString())
  }
  getSelectedEndDate(endDate: string | IrisaDate) {
    this.toDate.setValue(endDate?.toString())
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      alerts: [null],
      alertType: [null],
      prm1: [null],
      prm2: [null],
      prm3: [null],
      bodyPhrase: [null],
      fromDate: [null],
      toDate: [null],
      datePeriod: [null]
    });
  }

  onSubmit() {
    const alerts = this.selectedAlerts.map(alert => alert.alertId)
    this.alerts.setValue(alerts)
    this.onSearchData.emit(
      this.filterForm.getRawValue()
    );
    //scroll to list
    // let el = document.getElementById('tableResult');
    // el.scrollIntoView({ behavior: "smooth" });
  }

  resetForm() {
    for (let index = this.selectedAlerts.length - 1; index >= 0; index--)
      this.remove(this.selectedAlerts[index])
    this.alerts.setValue([])
    this.alertType.setValue(null)
    this.prm1.setValue(null)
    this.prm2.setValue(null)
    this.prm3.setValue(null)
    this.fromDate.setValue(null)
    this.toDate.setValue(null)
    this.alertIdInput.nativeElement.value = '';
    this.alertTitleInput.nativeElement.value = '';
  }

  add(event: MatChipInputEvent, caller: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      var index
      if (caller == 'alertId') {
        index = this._alertList.findIndex(x => x.alertId.toString() == value.trim());
      }
      else if (caller === 'alertTitle') {
        index = this._alertList.findIndex(x => x.title == value.trim());
      }
      if (index >= 0) {
        this.selectedAlerts.push(this._alertList[index]);
        this._alertList.splice(index, 1);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.alertIdCtrl.setValue(null);
    this.alertTitleCtrl.setValue(null);
  }

  remove(alert: IAlert): void {
    const index = this.selectedAlerts.indexOf(alert);
    if (index >= 0) {
      this._alertList.push(this.selectedAlerts[index])
      this.selectedAlerts.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, caller: string): void {
    var index
    if (caller == 'alertId') {
      index = this._alertList.findIndex(x => x.alertId.toString() === event.option.viewValue);
    }
    else if (caller === 'alertTitle') {
      index = this._alertList.findIndex(x => x.title === event.option.viewValue);
    }
    if (index >= 0) {
      this.selectedAlerts.push(this._alertList[index]);
      this._alertList.splice(index, 1);
    }

    //clear input after chip selected
    this.alertIdInput.nativeElement.value = '';
    this.alertIdCtrl.setValue(null);
    this.alertTitleInput.nativeElement.value = '';
    this.alertTitleCtrl.setValue(null);
  }

  private _filterAlertId(value: number): IAlert[] {
    const filterValue = value;
    return this._alertList.filter(x => x.alertId.toString().indexOf(filterValue.toString()) === 0);
  }

  private _filterAlertTitle(value: string): IAlert[] {
    const filterValue = value.toLowerCase();
    return this._alertList.filter(x => x.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _isNumeric(value) {
    return /^\d+$/.test(value);
  }
}

