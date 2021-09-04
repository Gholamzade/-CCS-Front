import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'report-sample-presenter',
  template: `
  <report-sample-view></report-sample-view>
  `,
})
export class ReportSamplePresenter implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
