import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IrisaDate } from '@arc.module/utilities/date-utility';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  testCtrl: FormControl = new FormControl(null)
  test2Ctrl: FormControl = new FormControl(null, [Validators.required])
  test3Ctrl: FormControl = new FormControl(null, [Validators.required])
  hide = true;
  jalaliDateTime: IrisaDate
  miladiDateTime: IrisaDate
  constructor() { }

  ngOnInit(): void {
  }

  start: IrisaDate
  end: IrisaDate
  dateChange(date) {
    console.log('date: ', date);

  }

}
