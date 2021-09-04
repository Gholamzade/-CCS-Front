import { ITeam } from '../../../../../../models/interfaces/team.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-view',
  templateUrl: './team-view.html',
  styleUrls: ['./team-view.scss'],
})
export class TeamView implements OnInit {
  takenTeamTitleToEdit: boolean;
  takenTeamTitleToAdd: boolean;
  titleToAdd = '';
  editTitle: string;
  @Input() teamArray: ITeam[];
  @Input() set messageToShow(data) {
    if (data && data.message !== '') {
      this.openSnackBar(data.message, data.action);
    } else {
      this.titleToAdd = '';
    }
  }

  @Output() newTeam = new EventEmitter<ITeam>();
  @Output() editTeam = new EventEmitter<ITeam>();
  @Output() deleteTeam = new EventEmitter<ITeam>();

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void { }

  getRandomColor() {
    const color = Math.floor(0x10000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  add() {
    const obj: ITeam = {
      shiftTeamId: 0,
      title: this.titleToAdd,
      isEditing: false,
      color: "",
      editTitle: "",
    };
    this.newTeam.emit(obj);
    this.titleToAdd = "";
  }

  delete(item) {
    this.deleteTeam.emit(item);
  }

  requestEdit(item: ITeam) {
    this.teamArray.forEach((element) => {
      element.isEditing = false;
    });
    item.isEditing = true;
    this.editTitle = item.title;
  }

  doneEdit(item: ITeam) {
    item.editTitle = this.editTitle;
    this.editTeam.emit(item);
  }

  cancelEdit(item) {
    item.isEditing = false;
  }

  teamTitleChanged(item: ITeam) {
    if (item === null) {
      this.takenTeamTitleToAdd = false;
      if (this.titleToAdd.trim() !== '') {
        let serchItem = this.teamArray.find(
          (x) => x.title.toLowerCase() === this.titleToAdd.toLowerCase()
        );
        if (serchItem) {
          this.takenTeamTitleToAdd = true;
        }
      }
    } else {
      this.takenTeamTitleToEdit = false;

      if (this.editTitle.trim() !== '') {
        let serchItem = this.teamArray.find(
          (x) =>
            x.title.toLowerCase() === this.editTitle.toLowerCase() &&
            x.shiftTeamId !== item.shiftTeamId
        );
        if (serchItem) {
          this.takenTeamTitleToEdit = true;
        }
      }
    }
  }
}
