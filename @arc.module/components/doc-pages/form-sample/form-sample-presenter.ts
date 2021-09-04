import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'form-sample-presenter',
  template: `
  <form-sample-view
  [form-data]="formData$ | async"
  ></form-sample-view>
  `,
})
export class FromSamplePresenter implements OnInit {

  formData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  TESTDATA
  ngOnInit() {
    this.formData$.next(this.TESTDATA)
  }


}
