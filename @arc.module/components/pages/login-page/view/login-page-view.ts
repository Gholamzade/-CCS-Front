import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'arc-login-page-view',
  templateUrl: './login-page-view.html',
  styleUrls: ['./login-page-view.scss']
})
export class LoginPageComponent implements OnInit {

  @Output() onLogin = new EventEmitter<{ username, password }>();
  @Input() title = "this is the";
  @Input() set error(value: string) {
    this.inProcess = false;
    this._error = value;
    if (this._error != "") {
      setTimeout(() => { this._error = ""; }, 5000);
    }

  }

  uHide = false;
  pHide = true;
  inProcess = false;
  username = "";
  password = "";
  _error = "";


  constructor() { }

  ngOnInit(): void { }

  loginClicked() {
    if (this.inProcess) {
      return;
    }
    if (this.username.trim() === "" || this.password.trim() === "") {
      this.error = "EMPTY FIELD";
      return;
    }
    this.inProcess = true;
    this.onLogin.emit({ username: this.username, password: this.password })
  }


}
