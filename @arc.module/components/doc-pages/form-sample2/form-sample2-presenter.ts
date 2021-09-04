import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'form-sample2-presenter',
  template: `
  <form-sample2-view
  [form-data]="formData$ | async"
  ></form-sample2-view>
  `,
})
export class FromSample2Presenter implements OnInit {

  formData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  TESTDATA
  ngOnInit() {
    this.formData$.next(this.TESTDATA)
  }


}
