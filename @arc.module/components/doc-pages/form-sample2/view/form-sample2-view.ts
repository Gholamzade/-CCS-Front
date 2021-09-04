import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '@arc.module/services/language.service';
import { BreakPointsService } from '@arc.module/services/break-points.service';
import { BehaviorSubject } from 'rxjs';
import { IrisaDate } from '@arc.module/utilities/date-utility';
@Component({
  selector: 'form-sample2-view',
  templateUrl: './form-sample2-view.html',
  styleUrls: ['./form-sample2-view.scss'],
})
export class FromSample2View implements OnInit {
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
    count: [""],
    startDate: ["", Validators.required],
  });

  form2 = this.fb.group({
    txt1: ["", Validators.required],
    txt2: ["", Validators.required],
    date: ["", Validators.required],
  });

  @Input('form-data') formData: any[]


  /******************************************table**************************************************************/
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  testCtrl: FormControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private breakPointsService: BreakPointsService,
  ) {
    this.dir = languageService.getDirection()

  }


  ngOnInit(): void {

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
    this.form.controls.startDate.setValue(startDate.toString())
  }
  getSelectedEndDate(endDate: string | IrisaDate) {
    this.form.controls.endDate.setValue(endDate.toString())
  }



  getSelectedDate(endDate: string | IrisaDate) {
    this.form2.controls.date.setValue(endDate.toString())
  }
}
