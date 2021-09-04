
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@arc.module/services/language.service';
import { ROUTE_ICONS } from "src/app/route-icons";
@Pipe({

  name: 'iconSetter'

})

export class IconSetterPipe implements PipeTransform {
  dir: string

  constructor(private languageService: LanguageService) {
    this.dir = languageService.getDirection()
  }
  public transform(route: string): string {
    route = route.trimStart().trimEnd()
    if (route?.includes('/')) {
      route = route.replace(/\//g, '')
    }
    let icon = ROUTE_ICONS.find(x => x.route === route);
    return (icon && icon?.icon) ? icon?.icon : this.dir === 'rtl' ? 'chevron_left' : 'chevron_right';

  }
}
