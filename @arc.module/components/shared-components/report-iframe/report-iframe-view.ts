import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "c-arc-report-view",
  templateUrl: "./report-iframe-view.html",
  styleUrls: ["./report-iframe-view.scss"]
})
export class ReportIframeView implements OnInit,OnDestroy {

  src = "";
  private sub: any;

  constructor(private route: ActivatedRoute) {


  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);

      const data = params['data'];
      this.src = "http://" + params.serverAddress + "/report/share/public/" + params.reportName + "/" + params.reportRevision;

   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
