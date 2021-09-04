import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { LanguageService } from '@arc.module/services/language.service';

@Directive({
  selector: '[translateTo]'
})
export class TranslateDirective implements OnInit, AfterViewInit {
  @Input('translateTo') translateTo: string
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    let translated = this.languageService.translate(this.el.nativeElement.innerText, this.translateTo)

    this.el.nativeElement.innerText = translated
  }

  ngAfterViewInit() { }
}
