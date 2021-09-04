import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { TelegramEditPresenter } from '../../telegram-edit/telegram-edit-presenter';
import { TelegramBodyPresenter } from '../../telegram-body/telegram-body-presenter';

@Component({
  selector: 'telegram-list-view',
  templateUrl: './telegram-list-view.html',
  styleUrls: ['./telegram-list-view.scss']
})
export class TelegramListView implements OnInit {

  displayedColumns = ['telegramId', 'name', 'description', 'saveInHistory', 'enabled', 'options'];
  dataSource: MatTableDataSource<ITelegram>;

  telegrams: ITelegram[] = [];
  @Input('telegrams') set _telegrams(value: ITelegram[]) {
    if (value) {
      this.telegrams = value;
      this.dataSource = new MatTableDataSource(this.telegrams);
      this.dataSource.sort = this.sort;
    }
  }

  @Output() telegramsRefresh = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
  ) {

  }

  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // ----------- EDIT & UPDATE -----------

  public editTelegram(telegram: ITelegram) {
    let telegramToEdit: ITelegram;
    telegramToEdit = { ...telegram };

    const dialogRef = this.dialog.open(TelegramEditPresenter, {
      maxWidth: '300px',
      data: telegramToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // user added or edited
        this.telegramsRefresh.emit(true);
      }
      else { //canceled
      }
    });
  }


  public showBody(telegram: ITelegram) {
    this.dialog.open(TelegramBodyPresenter, {
      maxWidth: "700px",
      data: telegram
    });
  }



  ngOnInit() {

  }

}
