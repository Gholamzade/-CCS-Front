import { Routes } from '@angular/router';
import { LoginPagePresenter } from './components/pages/login-page/login-page-presenter'
import { ShiftPagePresenter } from './components/pages/shift-page/shift-page-presenter'
import { AlertLogPagePresenter } from './components/pages/alert-log-page/alert-log-page-presenter'
import { AlertDefinitionPagePresenter } from './components/pages/alert-definition-page/alert-definition-page-presenter'
import { MenuPagePresenter } from './components/pages/menu-page/menu-page-presenter'
import { UserPagePresenter } from './components/pages/user-page/user-page-presenter'
import { ReportDefinitionPagePresenter } from './components/pages/report-definition-page/report-definition-page-presenter'
import { TelegramModificationPagePresenter } from './components/pages/telegram-modification-page/telegram-modification-page-presenter'
import { TelegramLogPagePresenter } from './components/pages/telegram-log-page/telegram-log-page-presenter'
import { NotFoundComponent } from './components/shared-components/not-found/not-found.component';
import { ReportIframeView } from './components/shared-components/report-iframe/report-iframe-view';


export const DOC_ROUTES: Routes = [
  {
    path: 'document',
    loadChildren: () =>
      import('./components/doc-pages/doc-pages.module').then(
        (m) => m.DocPagesModule
      ),

  },

];

export const ARC_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPagePresenter },
  { path: 'shift-definition', component: ShiftPagePresenter },
  { path: 'alert-log', component: AlertLogPagePresenter },
  { path: 'alert-definition', component: AlertDefinitionPagePresenter },
  { path: 'menu-definition', component: MenuPagePresenter },
  { path: 'user-definition', component: UserPagePresenter },
  { path: 'report-definition', component: ReportDefinitionPagePresenter },
  { path: 'report-view', component: ReportIframeView },
  { path: 'telegram-modification', component: TelegramModificationPagePresenter },
  { path: 'telegram-log', component: TelegramLogPagePresenter },
  { path: '404', component: NotFoundComponent },
  ...DOC_ROUTES
  // {
  //     path: '**',
  //     redirectTo: '404'
  // }
];
