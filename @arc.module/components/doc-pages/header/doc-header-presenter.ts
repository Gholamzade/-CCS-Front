import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doc-header-presenter',
  template: `
  <doc-header-view></doc-header-view>
  `,
})
export class DocHeaderPresenter implements OnInit {


  constructor() { }


  ngOnInit() {

  }


}
