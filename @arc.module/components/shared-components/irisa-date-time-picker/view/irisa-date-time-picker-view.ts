import { CdkOverlayOrigin, ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { SimpleDateTimePickerPresenter } from '../../simple-date-time-picker/simple-date-time-picker-presenter';
import { IrisaDate } from '@arc.module/utilities/date-utility';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DateFormatValidator } from '@arc.module/utilities/custom-validators/date-format-validator';

@Component({
  selector: 'irisa-date-time-picker-view',
  templateUrl: './irisa-date-time-picker-view.html',
  styleUrls: ['./irisa-date-time-picker-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class IrisaDateTimePickeView implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject();
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;
  @ViewChild('Origin') origin: CdkOverlayOrigin;

  @Output() onSelectedDate: EventEmitter<string | IrisaDate> = new EventEmitter<string | IrisaDate>();
  @Input() label;
  @Input() buttonsLabel: { submit: string, cancel: string };
  @Input() placeholder = '';
  @Input() showTime: boolean;
  private _locale: string
  @Input() set locale(val: string) {
    this._locale = val;
    // if (val) {
    //   this.selectedDateFormControl.setValidators([DateFormatValidator(val)])
    // }
  };

  get locale(): string {
    return this._locale;
  }

  selectedDateFormControl: FormControl = new FormControl(new IrisaDate(this.locale), [DateFormatValidator(this.locale)])

  dateTimePickerRef: ComponentRef<SimpleDateTimePickerPresenter>

  private _selectedDate: string | IrisaDate;
  @Input() set selectedDate(val: string | IrisaDate) {

    // this._selectedDate = val;
    this.selectedDateFormControl.setValue(val)

  }
  get selectedDate(): string | IrisaDate {
    return this._selectedDate;
  }
  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public breakPointService: BreakPointsService,
    public router: Router,
  ) { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {

    this.selectedDateFormControl.valueChanges.pipe(
      takeUntil(this.destroy),
      // distinctUntilChanged((prev: IrisaDate | string, curent: IrisaDate | string) => curent?.toString() === prev?.toString())
      distinctUntilChanged()
    ).subscribe((value) => {
      this._selectedDate = value
      this.onSelectedDate.emit(value)
    })
  }

  openPanelWithBackdrop() {
    let posiotions = null
    if (this.breakPointService.isLtMd) {
      posiotions = [
        new ConnectionPositionPair({ originX: 'center', originY: 'center' }, { overlayX: 'center', overlayY: 'center' }),
        new ConnectionPositionPair({ originX: 'center', originY: 'center' }, { overlayX: 'center', overlayY: 'center' }),
      ];
    }
    else {
      posiotions = [
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
      ];
    }
    let strategy = this.overlay.position()
      .flexibleConnectedTo(
        this._overlayOrigin.elementRef)
      .withPositions(posiotions)
      .withPush(false);

    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy,
      // height: '10vh',
      width: '100%',

    });
    let overlayRef = this.overlay.create(config);

    this.dateTimePickerRef = overlayRef.attach(new ComponentPortal(SimpleDateTimePickerPresenter, this.viewContainerRef));
    this.dateTimePickerRef.instance.showTime = this.showTime ? true : false;

    this.dateTimePickerRef.instance.selectedDate = this.selectedDateFormControl.invalid ? null : this.selectedDate;
    this.dateTimePickerRef.instance.locale = this.locale;
    this.dateTimePickerRef.instance.buttonsLabel = this.buttonsLabel;

    this.dateTimePickerRef.instance.dateChange.asObservable().pipe(
      takeUntil(this.destroy)
    ).subscribe((date: string | IrisaDate) => {

      this.selectedDateFormControl.setValue(date)
      // this.selectedDate = date;
      // this.onSelectedDate.emit(date)
      overlayRef.dispose()
    });

    this.dateTimePickerRef.instance.onCloseEvent.asObservable().pipe(
      takeUntil(this.destroy)
    ).subscribe(() => {
      overlayRef.dispose()
    });

    overlayRef.backdropClick().pipe(
      takeUntil(this.destroy)
    ).subscribe(() => overlayRef.dispose());

    this.router.events.pipe(
      takeUntil(this.destroy),
      filter(val => val instanceof NavigationEnd || val instanceof NavigationStart),
    ).subscribe(res => {
      overlayRef.dispose()
    })

  }


}

