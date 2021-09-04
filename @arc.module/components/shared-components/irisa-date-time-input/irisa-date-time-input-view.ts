import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { IrisaDate } from '@arc.module/utilities/date-utility';
import { Observable, Subject } from 'rxjs';
import { PATTERN_INPUT_HOUR, PATTERN_INPUT_MINUTE, PATTERN_INPUT_SECOND } from '@arc.module/constants/date-time-patterns';

@Component({
  selector: 'irisa-date-time-input',
  templateUrl: './irisa-date-time-input-view.html',
  styleUrls: ['./irisa-date-time-input-view.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: IrisaDateTimeInput
    },
    // {
    //   provide: NG_VALIDATORS,
    //   multi: true,
    //   useFactory: IrisaDateTimeInput
    // }
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class IrisaDateTimeInput implements ControlValueAccessor, MatFormFieldControl<IrisaDate>, OnDestroy {
  static nextId = 0;
  @ViewChild('day') dayInput: HTMLInputElement;
  @ViewChild('hour') hourInput: HTMLInputElement;
  @ViewChild('minute') minuteInput: HTMLInputElement;
  @ViewChild('month') monthInput: HTMLInputElement;
  @ViewChild('second') secondInput: HTMLInputElement;
  @ViewChild('year') yearInput: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'irisa-date-time-input';
  id = `irisa-date-time-input-${IrisaDateTimeInput.nextId++}`;
  onChange = (_: any) => { console.log(_); };
  onTouched = () => { };

  get empty() {
    const {
      value: { day, hour, minute, month, second, year }
    } = this.parts;
    return !day && !hour && !minute && !month && !second && !year;

  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string;
  @Input('locale') locale: string;
  private _showTime: boolean = false;
  @Input('showTime') get showTime(): boolean {
    return this._showTime;
  }
  set showTime(value: boolean) {
    this._showTime = value;

  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): IrisaDate | null {
    let {
      day, hour, minute, month, second, year
    } = this.parts.controls;

    // if (this.parts.valid) {
    //   const {
    //     day, hour, minute, month, second, year
    //   } = this.parts.value;
    let irisaDate: IrisaDate = new IrisaDate(this.locale);

    irisaDate.year = year.valid ? parseInt(year.value) : year.value;
    irisaDate.day = day.valid ? parseInt(day.value) : day.value;
    irisaDate.month = month.valid ? parseInt(month.value) : month.value;
    irisaDate.hour = hour.valid ? parseInt(hour.value) : hour.value;
    irisaDate.minute = minute.valid ? parseInt(minute.value) : minute.value;
    irisaDate.second = second.valid ? parseInt(second.value) : second.value;

    return irisaDate;
    // }

    // return new IrisaDate(this.locale, true);
    return null;
  }
  set value(date: IrisaDate | null) {
    const { day, hour, minute, month, second, year, locale } = date || new IrisaDate(this.locale, true);
    if (this.showTime) {
      this.parts.setValue({ day, hour, minute, month, second, year });
    } else {
      this.parts.setValue({ day, month, year, hour: 0, minute: 0, second: 0 });
    }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      day: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(31)]
      ],
      month: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(12)]
      ],
      year: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1363), Validators.max(3000)]
      ],
      second: [
        0,
        [Validators.required, Validators.pattern(PATTERN_INPUT_SECOND)]
      ],
      minute: [
        0,
        [Validators.required, Validators.pattern(PATTERN_INPUT_MINUTE)]
      ],
      hour: [
        0,
        [Validators.required, Validators.pattern(PATTERN_INPUT_HOUR)]
      ]
    });


    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  autofilled?: boolean;

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, currentElement?: HTMLInputElement, nextElement?: HTMLInputElement): void {
    if (control.valid && nextElement && currentElement.maxLength === control.value?.toString().length) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value?.toString()?.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.irisa-date-time-input-container')!;
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    // if (this.parts.controls.second.valid) {
    //   this._focusMonitor.focusVia(this.secondInput, 'program');
    // } else if (this.parts.controls.minute.valid) {
    //   this._focusMonitor.focusVia(this.minuteInput, 'program');
    // } else if (this.parts.controls.hour.valid) {
    //   this._focusMonitor.focusVia(this.hourInput, 'program');
    // } else if (this.parts.controls.day.valid) {
    //   this._focusMonitor.focusVia(this.dayInput, 'program');
    // } else if (this.parts.controls.month.valid) {
    //   this._focusMonitor.focusVia(this.monthInput, 'program');
    // } else {
    //   this._focusMonitor.focusVia(this.yearInput, 'program');
    // }

    // if (this.parts.controls.year.valid) {
    //   this._focusMonitor.focusVia(this.yearInput, 'program');
    // } else if (this.parts.controls.month.valid) {
    //   this._focusMonitor.focusVia(this.monthInput, 'program');
    // } else if (this.parts.controls.day.valid) {
    //   this._focusMonitor.focusVia(this.dayInput, 'program');
    // } else if (this.parts.controls.hour.valid) {
    //   this._focusMonitor.focusVia(this.hourInput, 'program');
    // } else if (this.parts.controls.minute.valid) {
    //   this._focusMonitor.focusVia(this.minuteInput, 'program');
    // } else {
    //   this._focusMonitor.focusVia(this.secondInput, 'program');
    // }

  }

  writeValue(date: IrisaDate | null): void {
    this.value = date;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, currentElement?: HTMLInputElement, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, currentElement, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;

}
