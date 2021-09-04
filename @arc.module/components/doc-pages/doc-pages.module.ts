import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPagesRoutingModule } from './doc-pages-routing.module';


import {
  DocHeaderPresenter,
  DocHeaderView,
  DocTableSamplePresenter,
  DocTableSampleView
} from './index'
import { SampleSvgPresenter } from './sample-svg/sample-svg-presenter';
import { SampleSvgView } from './sample-svg/view/sample-svg-view';
import { MaterialModule } from '@arc.module/material.module';
import { InputsComponent } from './inputs/inputs.component';
import { FromSamplePresenter } from './form-sample/form-sample-presenter';
import { FromSampleView } from './form-sample/view/form-sample-view';
import { FromSample2Presenter } from './form-sample2/form-sample2-presenter';
import { FromSample2View } from './form-sample2/view/form-sample2-view';
import { ArcModule } from '@arc.module/arc.module';
import { ModalSamplePresenter } from './modal-sample/modal-sample-presenter';
import { ModalSampleView } from './modal-sample/view/modal-sample-view';
import { DocButtonsPresenter } from './buttons/doc-buttons-presenter';
import { DocButtonsView } from './buttons/view/doc-buttons-view';
import { DocUtilityPresenter } from './utility/doc-utility-presenter';
import { DocUtilityView } from './utility/view/doc-utility-view';
import { ReportSamplePresenter } from './report-sample/report-sample-presenter';
import { ReportSampleView } from './report-sample/view/report-sample-view';
// import { ResponsiveTablePresenter } from './table-sample/components/responsive-table/responsive-table-presenter';
// import { ResponsiveTableView } from './table-sample/components/responsive-table/view/responsive-table-view';
import { MessagesSamplePresenter } from './messages-sample/messages-sample-presenter';
import { MessagesSampleView } from './messages-sample/view/messages-sample-view';

const DOC_COMPONENTS = [
  DocHeaderPresenter,
  DocHeaderView,
  DocTableSamplePresenter,
  DocTableSampleView,
  SampleSvgPresenter,
  SampleSvgView,

  InputsComponent,

  FromSamplePresenter,
  FromSampleView,
  FromSample2Presenter,
  FromSample2View,
  ModalSamplePresenter,
  ModalSampleView,

  DocButtonsPresenter,
  DocButtonsView,

  DocUtilityPresenter,
  DocUtilityView,

  ReportSamplePresenter,
  ReportSampleView,

  // ResponsiveTablePresenter,
  // ResponsiveTableView,

  MessagesSamplePresenter,
  MessagesSampleView

];

@NgModule({
  declarations: [
    ...DOC_COMPONENTS
  ],
  imports: [
    CommonModule,
    DocPagesRoutingModule,
    MaterialModule,
    ArcModule
  ]
})
export class DocPagesModule { }
