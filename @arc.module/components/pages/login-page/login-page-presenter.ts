import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@arc.module/services/auth.service';
import { SettingsService } from '@arc.module/services/settings.service';

@Component({
  selector: 'menu-page-presenter',
  template: `<arc-login-page-view
[title]="settings.json?.appTitle"
[error]="error"
(onLogin)=tryLogin($event)
   ></arc-login-page-view>`
})
export class LoginPagePresenter implements OnInit {

  error = "";
  constructor(
    private auth: AuthService,
    private router: Router,
    public settings: SettingsService
  ) { }

  ngOnInit() {
    this.auth.loginStatus.next(false)
    this.auth.logOut();
  }
  tryLogin(event) {

    this.error = "";
    this.auth.login(event.username, event.password).then(res => {
      if (res != "SUCCESS") {
        console.log(res);

        this.error = res;
      }

    });

  }









}
