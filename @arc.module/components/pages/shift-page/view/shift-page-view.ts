import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamPresenter } from '../components/team/team-presenter';
import { ShiftPresenter } from '../components/shift/shift-presenter';
import { AutoAssignPresenter } from '../components/auto-assign/auto-assign-presenter';

@Component({
  selector: 'shift-page-view',
  templateUrl: './shift-page-view.html',
  styleUrls: ['./shift-page-view.scss']
})
export class ShiftPageView implements OnInit {

  scrHeight: number;
  scrWidth: number;
  modalWidth = 0;
  modalHeight = 0;

  constructor(public dialog: MatDialog) {
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
    if (this.scrWidth < 600) {
      this.modalWidth = this.scrWidth * 0.90;
    } else if (this.scrWidth > 599 && this.scrWidth < 960) {
      this.modalWidth = this.scrWidth * 0.85;
    } else if (this.scrWidth > 959 && this.scrWidth < 1280) {
      this.modalWidth = this.scrWidth * 0.80;
    } else if (this.scrWidth > 1279) {
      this.modalWidth = this.scrWidth * 0.70;
    }
  }

  showTeams() {
    const dialogRef = this.dialog.open(TeamPresenter, {
      data: {}
    });
  }

  showShifts() {
    const dialogRef = this.dialog.open(ShiftPresenter, {
      data: {}
    });
  }

  showAutoAssign() {
    const dialogRef = this.dialog.open(AutoAssignPresenter, {
      data: {}
    });
  }
}
