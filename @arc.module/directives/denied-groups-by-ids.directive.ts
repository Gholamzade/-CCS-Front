import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[denied-groups-by-ids]'
})
export class DeniedGroupsByIdsDirective implements AfterViewInit {
  @Input('denied-groups-by-ids') unAllowedGroups: number[]

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tokenService: TokenService

  ) { }

  ngAfterViewInit() {
    if (this.unAllowedGroups && this.unAllowedGroups.includes(this.tokenService?.user?.groupId)) {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', 'true');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    }
  }
}
