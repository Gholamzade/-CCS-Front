import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageType } from '@arc.module/enums/message-type';
import { MessageData } from '@arc.module/models/interfaces/message';
import { LanguageService } from '@arc.module/services/language.service';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { filter, map, mapTo, scan, tap } from 'rxjs/operators';

@Component({
  selector: 'message-view',
  templateUrl: './message-view.html',
  styleUrls: ['./message-view.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25%)' }),
        animate('{{showTransitionParams}}')
      ]),
      transition(':leave', [
        animate('{{hideTransitionParams}}', style({ height: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: 'hidden', opacity: 0 }))
      ])
    ])
  ],
})
export class MessageView implements OnInit, OnDestroy {
  counterSubscription: Subscription
  messageType = MessageType
  dir: 'rtl' | 'ltr'
  duration: number
  value: number
  @Input() messageData: MessageData;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageData,
    public ref: MatSnackBarRef<MessageView>,
    private languageService: LanguageService
  ) {
    this.messageData = data;
    this.dir = languageService.getDirection();
    this.duration = this.ref.containerInstance.snackBarConfig.duration

  }
  ngOnDestroy(): void {
    // this.counterSubscription.unsubscribe()
  }
  ngOnInit(): void {

    // counter$ = interval(1000);
    //   .pipe(
    //     mapTo(-1000),
    //     scan((acc, curr) => {
    //       return acc + curr;
    //     }, this.duration),
    //     tap(value => console.log(value)),
    //     filter(value => value >= 0),
    //     map(res => res * 100 / (5 * 1000))
    //   )
    //   .subscribe(value => {
    //     console.log('value: ', value);
    //     this.value = value
    //   });
  }

  close() {
    this.ref.dismiss();
  }


}
