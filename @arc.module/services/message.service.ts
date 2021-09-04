import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageView } from '@arc.module/components/shared-components/message/message-view';
import { MessageData } from '@arc.module/models/interfaces/message';


@Injectable()
export class MessageService {

  constructor(private _snackBar: MatSnackBar) {

  }

  async openSnackBar(data: MessageData, config?: MatSnackBarConfig) {
    const ref = this._snackBar.openFromComponent(MessageView, {
      data: data,
      duration: 5 * 1000,
      panelClass: `alert-${data.type}`,
      ...config
    });

    return await ref.afterDismissed()

  }

}
