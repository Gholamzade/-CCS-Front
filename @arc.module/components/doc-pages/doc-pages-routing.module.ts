import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Route } from '@angular/router';
import { DocTableSamplePresenter } from './table-sample/table-sample-presenter';
import { FromSamplePresenter } from './form-sample/form-sample-presenter';
import { FromSample2Presenter } from './form-sample2/form-sample2-presenter';
import { InputsComponent } from './inputs/inputs.component';
import { ModalSamplePresenter } from './modal-sample/modal-sample-presenter';
import { SampleSvgPresenter } from './sample-svg/sample-svg-presenter';
import { DocButtonsPresenter } from './buttons/doc-buttons-presenter';
import { DocUtilityPresenter } from './utility/doc-utility-presenter';
import { ReportSamplePresenter } from './report-sample/report-sample-presenter';
// import { ResponsiveTablePresenter } from './table-sample/components/responsive-table/responsive-table-presenter';
import { MessagesSamplePresenter } from './messages-sample/messages-sample-presenter';

export const DOCROUTESLIST: DocRoutes = [
  { path: 'table-sample', component: DocTableSamplePresenter, title: 'Table' },
  // { path: 'responsive-table', component: ResponsiveTablePresenter, title: 'Responsive Table' },
  { path: 'form-sample', component: FromSamplePresenter, title: 'Forms' },
  { path: 'form-sample2', component: FromSample2Presenter, title: 'Forms2' },
  { path: 'modal-sample', component: ModalSamplePresenter, title: 'Modals' },
  { path: 'inputs', component: InputsComponent, title: 'Inputs' },
  { path: 'svg-sample', component: SampleSvgPresenter, title: 'Svg Sample' },
  { path: 'buttons-sample', component: DocButtonsPresenter, title: 'Buttons Sample' },
  { path: 'utiliy', component: DocUtilityPresenter, title: 'Utiliy' },
  { path: 'report-sample', component: ReportSamplePresenter, title: 'Report Sample' },
  { path: 'message-sample', component: MessagesSamplePresenter, title: 'Message Service' },
];

@NgModule({
  imports: [
    RouterModule.forChild(DOCROUTESLIST)
  ],
  exports: [RouterModule]
})
export class DocPagesRoutingModule { }


export interface DocRoute extends Route {
  title?: string
}

export type DocRoutes = DocRoute[]
