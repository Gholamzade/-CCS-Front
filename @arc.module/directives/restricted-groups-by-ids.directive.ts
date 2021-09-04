import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../services/token.service';
@Directive({
  selector: '[restricted-groups-by-ids]'
})
export class RestrictedGroupsByIdsDirective {


  @Input('restricted-groups-by-ids') set unAllowedGroups(unAllowedGroups: number[]) {
    if (unAllowedGroups.includes(this.tokenService?.user?.groupId)) {
      this.vcRef.clear();
    } else {
      this.vcRef.createEmbeddedView(this.templateRef)
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private tokenService: TokenService
  ) {
  }
}
