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
import { PageGuard } from './gaurds/page.guard';


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
  { path: 'shift-definition', component: ShiftPagePresenter, canActivate: [PageGuard] },
  { path: 'alert-log', component: AlertLogPagePresenter, canActivate: [PageGuard] },
  { path: 'alert-definition', component: AlertDefinitionPagePresenter, canActivate: [PageGuard] },
  { path: 'menu-definition', component: MenuPagePresenter, canActivate: [PageGuard] },
  { path: 'user-definition', component: UserPagePresenter, canActivate: [PageGuard] },
  { path: 'report-definition', component: ReportDefinitionPagePresenter, canActivate: [PageGuard] },
  { path: 'report-view', component: ReportIframeView },
  { path: 'telegram-modification', component: TelegramModificationPagePresenter, canActivate: [PageGuard] },
  { path: 'telegram-log', component: TelegramLogPagePresenter, canActivate: [PageGuard] },
  { path: '404', component: NotFoundComponent },
  ...DOC_ROUTES,
  {
    path: '**',
    redirectTo: '404'
  }
];
