import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[allowed-groups-by-ids]'
})
export class AllowedGroupsByIdsDirective implements AfterViewInit {
  @Input('allowed-groups-by-ids') allowedGroups: number[]

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tokenService: TokenService

  ) { }

  ngAfterViewInit() {
    if (this.allowedGroups && !this.allowedGroups.includes(this.tokenService?.user?.groupId)) {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', 'true');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    }
  }
}
