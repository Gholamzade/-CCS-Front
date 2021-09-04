import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../services/token.service';
@Directive({
  selector: '[restricted-groups]'
})
export class RestrictedGroupsDirective {


  @Input('restricted-groups') set unAllowedGroups(unAllowedGroups: string[]) {
    if (unAllowedGroups.includes(this.tokenService?.user?.groupName)) {
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
