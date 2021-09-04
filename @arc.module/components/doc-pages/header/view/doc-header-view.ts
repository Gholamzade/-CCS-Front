import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doc-header-view',
  templateUrl: './doc-header-view.html',
  styleUrls: ['./doc-header-view.scss']
})
export class DocHeaderView implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
