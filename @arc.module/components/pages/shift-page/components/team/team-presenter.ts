import { Component, OnInit } from '@angular/core';

import { ShfitPageApiCallerService } from '../../../../../services/shfit-page-api-caller.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogPresenter } from '../confirm-dialog/confirm-dialog-presenter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IServerResponse } from '@arc.module/models/interfaces/server-response.interface';
import { ITeam } from '@arc.module/models/interfaces/team.interface';


@Component({
  selector: 'team-presenter',
  template: `<team-view
    [teamArray]="teams"
    [messageToShow]="messageToShow"
    (newTeam)="addTeam($event)"
    (editTeam)="editTeam($event)"
    (deleteTeam)="deleteTeam($event)"
  ></team-view>`,
})
export class TeamPresenter implements OnInit {
  teams: ITeam[] = [];
  messageToShow: { message: string; action: string };
  constructor(
    private snackBar: MatSnackBar,
    private shfitPageApiCallerService: ShfitPageApiCallerService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.RefreshTeamList();
  }

  async RefreshTeamList() {
    this.teams = [];
    this.teams = await this.shfitPageApiCallerService.getAllTeam();
  }

  async addTeam(event) {
    var res: IServerResponse = await this.shfitPageApiCallerService.modifyTeam(
      event
    );
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshTeamList();
    }
  }

  async editTeam(event: ITeam) {
    let teamToEdit: ITeam = { ...event };
    teamToEdit.title = event.editTitle;;
    var res: IServerResponse = await this.shfitPageApiCallerService.modifyTeam(
      teamToEdit
    );
    this.snackBar.open(res.message, '', { duration: 2000 });
    if (res.telId === 200) {
      this.RefreshTeamList();
    }
  }

  async deleteTeam(event: ITeam) {
    const dialogRef = this.dialog.open(ConfirmDialogPresenter, {
      data: { title: 'Delete ' + event.title, message: 'are you sure?' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let teamToDelete: ITeam = { ...event };
        teamToDelete.shiftTeamId *= -1;
        var res: IServerResponse = await this.shfitPageApiCallerService.modifyTeam(
          teamToDelete
        );
        this.snackBar.open(res.message, '', { duration: 2000 });
        if (res.telId === 200) {
          this.RefreshTeamList();
        }
      }
    });
  }
}
