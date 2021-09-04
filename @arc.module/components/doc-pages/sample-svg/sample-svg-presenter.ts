import { Component } from '@angular/core';

@Component({
  selector: "sample-svg-presenter",
  template: `<sample-svg-view
  [test-input]="testInput"
  (test-output)="testOutput($event)"
  ></sample-svg-view>`
})
export class SampleSvgPresenter{
  testInput:any

  constructor(
    // private service: Service
  )
  {

  }

  testOutput(outputDate:any){
    console.log(outputDate);
  }

}
