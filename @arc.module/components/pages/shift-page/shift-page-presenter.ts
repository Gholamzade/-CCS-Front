import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shift-page-presenter',
  template: '<shift-page-view></shift-page-view>',
})
export class ShiftPagePresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
