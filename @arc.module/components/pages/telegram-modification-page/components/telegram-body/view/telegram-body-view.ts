import { Component, OnInit, Input } from '@angular/core';
import { ITelegram } from '@arc.module/models/interfaces/telegram.interface';


@Component({
  selector: 'telegram-body-view',
  templateUrl: './telegram-body-view.html',
  styleUrls: ['./telegram-body-view.scss']
})
export class TelegramBodyView implements OnInit {

  @Input() telegram: ITelegram;

  constructor() {
  }


  ngOnInit(): void {
  }

}
