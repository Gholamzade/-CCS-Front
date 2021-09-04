import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '@arc.module/services/language.service';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { BehaviorSubject } from 'rxjs';
import { IrisaDate } from '@arc.module/utilities/date-utility';
@Component({
  selector: 'form-sample-view',
  templateUrl: './form-sample-view.html',
  styleUrls: ['./form-sample-view.scss'],
})
export class FromSampleView implements OnInit {
  dir: string
  reasons: any[] = [
    {
      reasonId: 1,
      reasonName: "test1"
    },
    {
      reasonId: 2,
      reasonName: "test2"
    },
    {
      reasonId: 3,
      reasonName: "test3"
    },
    {
      reasonId: 4,
      reasonName: "test4"
    },
  ]
  coils: any[] = [] as any[]
  stopTypes: { coilId: number, coilNumber: number }[] = [] as { coilId: number, coilNumber: number }[]

  form = this.fb.group({
    reason: ["", Validators.required],
    coil: ["", Validators.required],
    type: ["", Validators.required],
    comment: [""],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
  });

  get startDate() {
    return this.form.get('startDate')
  }
  get endDate() {
    return this.form.get('endDate')
  }
  form2 = this.fb.group({
    txt1: ["", Validators.required],
    txt2: ["", Validators.required],
    txt5: ["", Validators.required],
    txt6: ["", Validators.required],
    txt7: ["", Validators.required],
    date: ["", Validators.required],
  });

  @Input('form-data') formData: any[]


  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private breakPointsService: BreakPointsService,
  ) {
    this.dir = languageService.getDirection()

  }


  ngOnInit(): void {
    this.startDate.setValue(new IrisaDate('fa'))
    this.endDate.setValue(new IrisaDate('en'))
  }



  onChangeType(event) {
    console.log('event: ', event);

  }

  cancel() {


  }

  submit() {
    console.log(this.form.value);
  }

  getSelectedStartDate(startDate: string | IrisaDate) {
    console.log(startDate);
    this.form.controls.startDate.setValue(startDate.toString())
  }
  getSelectedEndDate(endDate: string | IrisaDate) {
    console.log(endDate);
    this.form.controls.endDate.setValue(endDate.toString())
  }



  getSelectedDate(endDate: string | IrisaDate) {
    this.form2.controls.date.setValue(endDate.toString())
  }
}
