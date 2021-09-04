import { Component } from '@angular/core';

@Component({
  selector: "modal-sample-presenter",
  template: `<modal-sample-view
  [test-input]="testInput"
  (test-output)="testOutput($event)"
  ></modal-sample-view>`
})
export class ModalSamplePresenter {
  testInput: any

  constructor(
    // private service: Service
  ) {

  }

  testOutput(outputDate: any) {
    console.log(outputDate);
  }

}
