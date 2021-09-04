import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IAlert } from '@arc.module/models/interfaces/alert.interface';



@Component({
  selector: 'alert-detail-view',
  templateUrl: './alert-detail-view.html',
  styleUrls: ['./alert-detail-view.scss']
})
export class AlertDetailView implements OnInit {

  @Input() alert: IAlert;

  constructor() { }

  ngOnInit(): void {
  }


}
