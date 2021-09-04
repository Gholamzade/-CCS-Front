import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'report-definition-page-presenter',
   template: ` <report-definition-page-view></report-definition-page-view>`,
})
export class ReportDefinitionPagePresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
