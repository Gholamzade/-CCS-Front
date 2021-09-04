import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doc-utility-view',
  templateUrl: './doc-utility-view.html',
  styleUrls: ['./doc-utility-view.scss']
})
export class DocUtilityView implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
