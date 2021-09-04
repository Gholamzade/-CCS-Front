import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }

}
