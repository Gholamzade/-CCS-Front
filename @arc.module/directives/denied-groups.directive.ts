import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[denied-groups]'
})
export class DeniedGroupsDirective implements AfterViewInit {
  @Input('denied-groups') unAllowedGroups: string[]

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tokenService: TokenService

  ) { }

  ngAfterViewInit() {
    if (this.unAllowedGroups && this.unAllowedGroups.includes(this.tokenService?.user?.groupName)) {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', 'true');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    }
  }
}
