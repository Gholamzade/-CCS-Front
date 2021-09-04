import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModifyUser } from '@arc.module/models/interfaces/modify-user.interface';

@Component({
  selector: 'user-editor-view',
  templateUrl: './user-editor-view.html',
  styleUrls: ['./user-editor-view.scss']
})
export class UserEditorView implements OnInit {

  @Input() user: IModifyUser;
  @Output() userEdited = new EventEmitter<IModifyUser>();
  isPasswordChanged: boolean = false;
  confirmPassword: string;
  newPassword: string;

  constructor() { }

  ngOnInit(): void {
  }

  submitChanges() {
    if (this.isPasswordChanged) {
      this.user.password = this.newPassword;
    }
    this.userEdited.emit(this.user);
  }
}
