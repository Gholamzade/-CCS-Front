import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GetAlertTypeNamePipe } from './pipes/get-alert-type-name.pipe'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BidiModule } from '@angular/cdk/bidi';

import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { LoginPageComponent } from './components/pages/login-page/view/login-page-view';
import { LoginPagePresenter } from './components/pages/login-page/login-page-presenter'

import { ArcFooterView } from './components/shared-components/footer/view/arc-footer-view'
import { ArcFooterPresenter } from './components/shared-components/footer/arc-footer-presenter'

import { AlertLogListPresenter } from './components/shared-components/footer/components/alert-log-list/alert-log-list-presenter'
import { AlertLogListView } from './components/shared-components/footer/components/alert-log-list/view/alert-log-list-view'

import { ArcToolbarView } from './components/shared-components/toolbar/view/arc-toolbar-view'
import { ArcToolbarPresenter } from './components/shared-components/toolbar/arc-toolbar-presenter'

import { PopupAlertPresenter } from './components/shared-components/toolbar/components/popup-alert/popup-alert-presenter'
import { PopupAlertView } from './components/shared-components/toolbar/components/popup-alert/view/popup-alert-view'

import { UserEditorPresenter } from './components/shared-components/user-editor/user-editor-presenter'
import { UserEditorView } from './components/shared-components/user-editor/view/user-editor-view'

import { ArcSidenavPresenter } from './components/shared-components/sidenav/sidenav-presenter'
import { ArcSidenavView } from './components/shared-components/sidenav/view/arc-sidenav-view'

import { UnitSelectorPresenter } from './components/shared-components/unit-selector/unit-selector-presenter'
import { UnitSelectorView } from './components/shared-components/unit-selector/view/unit-selector-view'

import { UserGroupSelectorPresenter } from './components/shared-components/user-group-selector/user-group-selector-presenter'
import { UserGroupSelectorView } from './components/shared-components/user-group-selector/view/user-group-selector-view'

import { ConfirmModalView } from './components/shared-components/confirm-modal/view/confirm-modal-view'
import { ConfirmModalPresenter } from './components/shared-components/confirm-modal/confirm-modal-presenter'

import { EditResponseDataPresenter } from './components/pages/telegram-log-page/components/edit-response-data/edit-response-data-presenter'
import { EditResponseDataView } from './components/pages/telegram-log-page/components/edit-response-data/view/edit-response-data-view'

import { TelegramFilterPresenter } from './components/pages/telegram-log-page/components/telegram-filter/telegram-filter-presenter'
import { TelegramFilterView } from './components/pages/telegram-log-page/components/telegram-filter/view/telegram-filter-view'

import { TelegramGridPresenter } from './components/pages/telegram-log-page/components/telegram-grid/telegram-grid-presenter'
import { TelegramGridView } from './components/pages/telegram-log-page/components/telegram-grid/view/telegram-grid-view'

import { TelegramLogPagePresenter } from './components/pages/telegram-log-page/telegram-log-page-presenter'
import { TelegramLogPageView } from './components/pages/telegram-log-page/view/telegram-log-page-view'

import { AlertAddEditPresenter } from './components/pages/alert-definition-page/components/alert-add-edit/alert-add-edit-presenter'
import { AlertAddEditView } from './components/pages/alert-definition-page/components/alert-add-edit/view/alert-add-edit-view'

import { AlertDetailPresenter } from './components/pages/alert-definition-page/components/alert-detail/alert-detail-presenter'
import { AlertDetailView } from './components/pages/alert-definition-page/components/alert-detail/view/alert-detail-view'

import { AlertListPresenter } from './components/pages/alert-definition-page/components/alert-list/alert-list-presenter'
import { AlertListView } from './components/pages/alert-definition-page/components/alert-list/view/alert-list-view'

import { AlertSendPresenter } from './components/pages/alert-definition-page/components/alert-send/alert-send-presenter'
import { AlertSendView } from './components/pages/alert-definition-page/components/alert-send/view/alert-send-view'

import { AlertDefinitionPagePresenter } from './components/pages/alert-definition-page/alert-definition-page-presenter'
import { AlertDefinitionPageView } from './components/pages/alert-definition-page/view/alert-definition-page-view'

import { AlertLogFilterPresenter } from './components/pages/alert-log-page/components/alert-log-filter/alert-log-filter-presenter'
import { AlertLogfilterView } from './components/pages/alert-log-page/components/alert-log-filter/view/alert-log-filter-view'

import { AlertLogFilterDialogPresenter } from './components/pages/alert-log-page/components/alert-log-filter-dialog/alert-log-filter-dialog-presenter'
import { AlertLogFilterDialogView } from './components/pages/alert-log-page/components/alert-log-filter-dialog/view/alert-log-filter-dialog-view'

import { AlertLogTable2Presenter } from './components/pages/alert-log-page/components/alert-log-table2/alert-log-table2-presenter'
import { AlertLogTable2View } from './components/pages/alert-log-page/components/alert-log-table2/view/alert-log-table2-view'

import { AlertLogPagePresenter } from './components/pages/alert-log-page/alert-log-page-presenter'
import { AlertLogPageView } from './components/pages/alert-log-page/view/alert-log-page-view'

import { MenuAddEditPresenter } from './components/pages/menu-page/components/menu-add-edit/menu-add-edit-presenter'
import { MenuAddEditView } from './components/pages/menu-page/components/menu-add-edit/view/menu-add-edit-view'

import { MenuListPresenter } from './components/pages/menu-page/components/menu-list/menu-list-presenter'
import { MenuListView } from './components/pages/menu-page/components/menu-list/view/menu-list-view'

import { SubmenuAddEditModalPresenter } from './components/pages/menu-page/components/submenu-add-edit/submenu-add-edit-modal-presenter'
import { SubmenuAddEditModalView } from './components/pages/menu-page/components/submenu-add-edit/view/submenu-add-edit-modal-view'

import { SubmenuListPresenter } from './components/pages/menu-page/components/submenu-list/submenu-list-presenter'
import { SubmenuListView } from './components/pages/menu-page/components/submenu-list/view/submenu-list-view'

import { MenuPagePresenter } from './components/pages/menu-page/menu-page-presenter'
import { MenuPageView } from './components/pages/menu-page/view/menu-page-view'

import { ReportAddEditPresenter } from './components/pages/report-definition-page/components/report-add-edit/report-add-edit-presenter'
import { ReportAddEditView } from './components/pages/report-definition-page/components/report-add-edit/view/report-add-edit-view'

import { ReportGroupAddEditPresenter } from './components/pages/report-definition-page/components/report-group-add-edit/report-group-add-edit-presenter'
import { ReportGroupAddEditView } from './components/pages/report-definition-page/components/report-group-add-edit/view/report-group-add-edit-view'

import { ReportGroupListPresenter } from './components/pages/report-definition-page/components/report-group-list/report-group-list-presenter'
import { ReportGroupListView } from './components/pages/report-definition-page/components/report-group-list/view/report-group-list-view'

import { ReportListPresenter } from './components/pages/report-definition-page/components/report-list/report-list-presenter'
import { ReportListView } from './components/pages/report-definition-page/components/report-list/view/report-list-view'

import { ReportDefinitionPagePresenter } from './components/pages/report-definition-page/report-definition-page-presenter'
import { ReportDefinitionPageView } from './components/pages/report-definition-page/view/report-definition-page-view'

import { AutoAssignPresenter } from './components/pages/shift-page/components/auto-assign/auto-assign-presenter'
import { AutoAssignView } from './components/pages/shift-page/components/auto-assign/view/auto-assign-view'

import { ConfirmDialogPresenter } from './components/pages/shift-page/components/confirm-dialog/confirm-dialog-presenter.component'
import { ConfirmDialogView } from './components/pages/shift-page/components/confirm-dialog/view/confirm-dialog-view'

import { MonthDaysPresenter } from './components/pages/shift-page/components/month-days/month-days-presenter'
import { MonthDaysView } from './components/pages/shift-page/components/month-days/view/month-days-view'

import { ShiftPresenter } from './components/pages/shift-page/components/shift/shift-presenter'
import { ShiftView } from './components/pages/shift-page/components/shift/view/shift-view'

import { TeamPresenter } from './components/pages/shift-page/components/team/team-presenter'
import { TeamView } from './components/pages/shift-page/components/team/view/team-view'

import { ShiftPagePresenter } from './components/pages/shift-page/shift-page-presenter'
import { ShiftPageView } from './components/pages/shift-page//view/shift-page-view'

import { TelegramBodyPresenter } from './components/pages/telegram-modification-page/components/telegram-body/telegram-body-presenter'
import { TelegramBodyView } from './components/pages/telegram-modification-page/components/telegram-body/view/telegram-body-view'

import { TelegramEditPresenter } from './components/pages/telegram-modification-page/components/telegram-edit/telegram-edit-presenter'
import { TelegramEditView } from './components/pages/telegram-modification-page/components/telegram-edit/view/telegram-edit-view'

import { TelegramListPresenter } from './components/pages/telegram-modification-page/components/telegram-list/telegram-list-presenter'
import { TelegramListView } from './components/pages/telegram-modification-page/components/telegram-list/view/telegram-list-view'

import { TelegramModificationPagePresenter } from './components/pages/telegram-modification-page/telegram-modification-page-presenter'
import { TelegramModificationPageView } from './components/pages/telegram-modification-page/view/telegram-modification-page-view'

import { GroupAddEditPresenter } from './components/pages/user-page/components/group-add-edit/group-add-edit-presenter'
import { GroupAddEditView } from './components/pages/user-page/components/group-add-edit/view/group-add-edit-view'

import { UserAddEditPresenter } from './components/pages/user-page/components/user-add-edit/user-add-edit-presenter'
import { UserAddEditView } from './components/pages/user-page/components/user-add-edit/view/user-add-edit-view'

import { UserPagePresenter } from './components/pages/user-page/user-page-presenter'
import { UserPageView } from './components/pages/user-page/view/user-page-view'

import { JsonViewerPresenter } from './components/pages/telegram-log-page/components/json-viewer/json-viewer-presenter'
import { JsonViewerView } from './components/pages/telegram-log-page/components/json-viewer/view/json-viewer-view'
import { NotFoundComponent } from './components/shared-components/not-found/not-found.component';
import { ReportIframeView } from './components/shared-components/report-iframe/report-iframe-view';

import { TelerikReportViewer } from './components/shared-components/report-telerik/telerik-report-viewer'

import { GetTelegramNameByIdPipe } from './pipes/get-telegram-name-by-id.pipe';
import { MaterialModule } from '@arc.module/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { IsoDateToLocalePipe } from './pipes/iso-date-to-locale.pipe';
import { DateTimePickerView } from '@arc.module/components/shared-components/date-time-picker/view/date-time-picker-view';
import { DateTimePickerPresenter } from '@arc.module/components/shared-components/date-time-picker/date-time-picker-presenter';
import { DateTimePickerOverlayPresenter } from '@arc.module/components/shared-components/date-time-picker-overlay/date-time-picker-overlay-presenter';
import { DateTimePickerOverlayView } from '@arc.module/components/shared-components/date-time-picker-overlay/view/date-time-picker-overlay-view';
import { SimpleDateTimePickerPresenter } from '@arc.module/components/shared-components/simple-date-time-picker/simple-date-time-picker-presenter';
import { SimpleDateTimePickerView } from '@arc.module/components/shared-components/simple-date-time-picker/view/simple-date-time-picker-view';
import { AlertListDialogView } from '@arc.module/components/shared-components/alert-list-dialog/view/alert-list-dialog-view';
import { DeniedGroupsDirective } from "./directives/denied-groups.directive";
import { RestrictedGroupsDirective } from "./directives/restricted-groups.directive";
import { RestrictedGroupsByIdsDirective } from "./directives/restricted-groups-by-ids.directive";
import { DeniedGroupsByIdsDirective } from "./directives/denied-groups-by-ids.directive";
import { AllowedGroupsByIdsDirective } from "./directives/allowed-groups-by-ids.directive";
import { AllowedGroupsDirective } from "./directives/allowed-groups.directive";
import { SafePipe } from "./pipes/safe-pipe.pipe";
import { UnitParse } from "./pipes/unit.pipe";
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { TranslatePipe } from "./pipes/translate.pipe";
import { TranslateDirective } from "./directives/translate.directive";
import { IconSetterPipe } from "./pipes/icon-setter.pipe";
import { RouterModule } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MiladiDateToJalaliPipe } from "@arc.module/pipes/miladi-date-to-jalali.pipe";
import { JalaliDateToMiladiPipe } from "@arc.module/pipes/jalali-date-to-miladi.pipe";
import { SummerizeTextPipe } from "@arc.module/pipes/summerize-text.pipe";
import { PrimePaginator } from "@arc.module/components/shared-components/prime-paginator/paginator";
import { MessageView } from './components/shared-components/message/message-view';

const SharedComponent = [

  PrimePaginator,
  MessageView
];

@NgModule({
  declarations: [
    GetAlertTypeNamePipe,
    LoginPageComponent,
    LoginPagePresenter,
    ArcFooterView,
    ArcFooterPresenter,
    AlertLogListView,
    AlertLogListPresenter,
    ArcToolbarPresenter,
    ArcToolbarView,
    PopupAlertPresenter,
    PopupAlertView,
    UserEditorPresenter,
    UserEditorView,
    ArcSidenavPresenter,
    ArcSidenavView,
    UnitSelectorPresenter,
    UnitSelectorView,
    UserGroupSelectorPresenter,
    UserGroupSelectorView,
    ConfirmModalView,
    EditResponseDataPresenter,
    EditResponseDataView,
    TelegramFilterPresenter,
    TelegramFilterView,
    TelegramGridPresenter,
    TelegramGridView,
    TelegramLogPagePresenter,
    TelegramLogPageView,
    AlertAddEditPresenter,
    AlertAddEditView,
    AlertDetailPresenter,
    AlertDetailView,
    AlertListPresenter,
    AlertListView,
    AlertSendPresenter,
    AlertSendView,
    AlertDefinitionPagePresenter,
    AlertDefinitionPageView,
    AlertLogFilterDialogPresenter,
    AlertLogFilterDialogView,
    AlertLogFilterPresenter,
    AlertLogfilterView,
    AlertLogTable2Presenter,
    AlertLogTable2View,
    AlertLogPagePresenter,
    AlertLogPageView,
    MenuAddEditPresenter,
    MenuAddEditView,
    MenuListPresenter,
    MenuListView,
    SubmenuAddEditModalPresenter,
    SubmenuAddEditModalView,
    SubmenuListPresenter,
    SubmenuListView,
    MenuPagePresenter,
    MenuPageView,
    ReportAddEditPresenter,
    ReportAddEditView,
    ReportListPresenter,
    ReportListView,
    ReportGroupAddEditPresenter,
    ReportGroupAddEditView,
    ReportGroupListPresenter,
    ReportGroupListView,
    ReportDefinitionPagePresenter,
    ReportDefinitionPageView,
    AutoAssignPresenter,
    AutoAssignView,
    ConfirmDialogPresenter,
    ConfirmDialogView,
    MonthDaysPresenter,
    MonthDaysView,
    ShiftPresenter,
    ShiftView,
    TeamPresenter,
    TeamView,
    ShiftPagePresenter,
    ShiftPageView,
    TelegramBodyPresenter,
    TelegramBodyView,
    TelegramEditPresenter,
    TelegramEditView,
    TelegramListPresenter,
    TelegramListView,
    TelegramModificationPagePresenter,
    TelegramModificationPageView,
    GroupAddEditPresenter,
    GroupAddEditView,
    UserAddEditPresenter,
    UserAddEditView,
    UserPagePresenter,
    UserPageView,
    JsonViewerPresenter,
    JsonViewerView,
    DateTimePickerPresenter,
    DateTimePickerView,
    DateTimePickerOverlayPresenter,
    DateTimePickerOverlayView,
    SimpleDateTimePickerPresenter,
    SimpleDateTimePickerView,
    AlertListDialogView,
    GetTelegramNameByIdPipe,
    IsoDateToLocalePipe,


    // InfoPopupDirective
    NotFoundComponent,
    GetTelegramNameByIdPipe,
    IconSetterPipe,
    JsonViewerPresenter,
    JsonViewerView,
    TelerikReportViewer,

    IsoDateToLocalePipe,
    SafePipe,
    UnitParse,
    TranslatePipe,
    TranslateDirective,
    DeniedGroupsDirective,
    RestrictedGroupsDirective,
    RestrictedGroupsByIdsDirective,
    DeniedGroupsByIdsDirective,
    AllowedGroupsByIdsDirective,
    AllowedGroupsDirective,
    ReportIframeView,
    MiladiDateToJalaliPipe,
    JalaliDateToMiladiPipe,
    SummerizeTextPipe,
    ConfirmModalView,
    ConfirmModalPresenter,
    ...SharedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    TelerikReportingModule,
    BidiModule,
    RouterModule
  ],
  exports: [
    BidiModule,
    TelerikReportingModule,
    LoginPagePresenter,
    TelegramLogPagePresenter,
    ArcFooterPresenter,
    ArcToolbarPresenter,
    ArcSidenavPresenter,
    AlertDefinitionPagePresenter,
    AlertLogPagePresenter,
    MenuPagePresenter,
    ReportDefinitionPagePresenter,
    ShiftPagePresenter,
    TelegramModificationPagePresenter,
    DateTimePickerPresenter,
    DateTimePickerView,
    UserPagePresenter,
    DateTimePickerOverlayPresenter,
    DateTimePickerOverlayView,
    SimpleDateTimePickerPresenter,
    SimpleDateTimePickerView,
    IsoDateToLocalePipe,
    // InfoPopupDirective
    // SidenavComponent,
    //  ToolbarComponent
    TelerikReportViewer,
    AlertListDialogView,

    IsoDateToLocalePipe,
    DeniedGroupsDirective,
    RestrictedGroupsDirective,
    RestrictedGroupsByIdsDirective,
    DeniedGroupsByIdsDirective,
    AllowedGroupsByIdsDirective,
    AllowedGroupsDirective,
    NotFoundComponent,
    ReportIframeView,
    ConfirmModalView,
    ConfirmModalPresenter,
    SafePipe,
    UnitParse,
    TranslatePipe,
    TranslateDirective,
    IconSetterPipe,
    MiladiDateToJalaliPipe,
    JalaliDateToMiladiPipe,
    SummerizeTextPipe,

    ...SharedComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        hasBackdrop: true
      }
    },
    // PageGuard
  ]
})
export class ArcModule { }
