import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doc-buttons-view',
  templateUrl: './doc-buttons-view.html',
  styleUrls: ['./doc-buttons-view.scss']
})
export class DocButtonsView implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
