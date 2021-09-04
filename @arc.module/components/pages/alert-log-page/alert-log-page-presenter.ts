import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'alert-log-page-presenter',
   template: ` <alert-log-page-view></alert-log-page-view>`,
})
export class AlertLogPagePresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
