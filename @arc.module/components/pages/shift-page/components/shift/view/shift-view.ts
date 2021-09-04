import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IShift } from '@arc.module/models/interfaces/shift.interface';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'shift-view',
  templateUrl: './shift-view.html',
  styleUrls: ['./shift-view.scss'],
})
export class ShiftView implements OnInit {
  value = '';
  startTimeValue = '00:00';
  endTimeValue = '00:00';
  editStartTime = '00:00';
  editEndTime = '00:00';
  titleToAdd = '';
  titleToEdit = '';
  takenShiftTitleToAdd: boolean = false;
  takenShiftTitleToEdit: boolean = false;

  @Input() shiftArray: IShift[];
  @Input() minutesOfADay: number[];
  @Output() newShift = new EventEmitter<IShift>();
  @Output() editShift = new EventEmitter<IShift>();
  @Output() deleteShift = new EventEmitter<IShift>();
  @Input() set messageToShow(data) {
    if (data && data.message !== '') {
      this.openSnackBar(data.message, data.action);
    } else {
      this.startTimeValue = '00:00';
      this.endTimeValue = '00:00';
      this.editStartTime = '00:00';
      this.editEndTime = '00:00';
    }
  }

  @Input() set successSave(data: { result: boolean; func: string }) {
    if (data && data.result) {
      if (data.func === 'edit') {
        const item = this.shiftArray.find((obj) => obj.isEditing === true);
        item.isEditing = false;
      }
      this.openSnackBar('shift saved successfuly.', '');
    }
  }

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void { }

  add() {
    const obj: IShift = {
      shiftTimeId: 0,
      title: this.titleToAdd,
      isEditing: false,
      startTime: this.startTimeValue,
      endTime: this.endTimeValue,
    };
    this.newShift.emit(obj);

  }

  delete(item) {
    this.deleteShift.emit(item);
  }

  requestEdit(item: IShift) {
    this.shiftArray.forEach((element) => {
      element.isEditing = false;
    });
    item.isEditing = true;
    this.titleToEdit = item.title;
    this.editStartTime = item.startTime.substr(0, 5);
    this.editEndTime = item.endTime.substr(0, 5);
  }

  doneEdit(item: IShift) {
    let shiftToEdit = { ...item };
    shiftToEdit.title = this.titleToEdit;
    shiftToEdit.startTime = this.editStartTime;
    shiftToEdit.endTime = this.editEndTime;
    this.editShift.emit(shiftToEdit);
  }

  cancelEdit(item) {
    item.isEditing = false;
  }

  shiftTitleChanged(item: IShift) {
    if (item === null) {
      this.takenShiftTitleToAdd = false;
      if (this.titleToAdd.trim() !== '') {
        let serchItem = this.shiftArray.find(
          (x) => x.title.toLowerCase() === this.titleToAdd.toLowerCase()
        );
        if (serchItem) {
          this.takenShiftTitleToAdd = true;
        }
      }
    } else {
      this.takenShiftTitleToEdit = false;

      if (this.titleToEdit.trim() !== '') {
        let serchItem = this.shiftArray.find(
          (x) =>
            x.title.toLowerCase() === this.titleToEdit.toLowerCase() &&
            x.shiftTimeId !== item.shiftTimeId
        );
        if (serchItem) {
          this.takenShiftTitleToEdit = true;
        }
      }
    }
  }

  getClass(num: number) {
    if (num) return 'has-shift';
    else return 'no-shift';
  }

  getTitle(i) {
    return Math.floor(i / 60) + ':' + (i % 60);
  }
}
