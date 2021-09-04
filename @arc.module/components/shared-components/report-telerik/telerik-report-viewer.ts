import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { ITelerikReportParameters } from '@arc.module/models/interfaces/report.interface';
import { SettingsService } from '@arc.module/services/settings.service';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'telerik-report-viewer',
  templateUrl: './telerik-report-viewer.html',
  styleUrls: ['./telerik-report-viewer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TelerikReportViewer implements OnInit {

  @ViewChild('viewer1') viewer: TelerikReportViewerComponent;

  reportServer: string;

  private _parameters: any
  private _reportFile: string

  reportSource: ITelerikReportParameters = { parameters: null, report: null }

  @Input() set parameters(val: any) {
    this._parameters = val;
    this.reportSource.parameters = val;
    this.viewer?.setReportSource(this.reportSource)

  };

  @Input() set reportFile(val: string) {
    this._reportFile = val;
    this.reportSource.report = val;
  };

  @Input('styles') viewerContainerStyle = {
    position: 'relative',
    height: '800px',
    ['font-family']: 'ms sans serif'
  };


  constructor(
    private settingsService: SettingsService) {
    this.reportServer = this.settingsService.json.serverAddresses[0]+'/Api/Reports/';
  }

  async ngOnInit() {

  }
}
