import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { LoginPagePresenter } from "@arc.module/components/pages/login-page/login-page-presenter";
import { NotFoundComponent } from "@arc.module/components/shared-components/not-found/not-found.component";
import { environment } from "src/environments/environment";
import { MenuService } from "./menu.service";

@Injectable({
  providedIn: "root"
})
export class DynamicRoutesService {
  dynamicRoutes: Routes = []
  /*
  NOTE: routes that does not exits in server but need access in client
  these routes must exits in arc-routes
  */
  defaultRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPagePresenter },
    { path: '404', component: NotFoundComponent },
    {
      path: '**',
      redirectTo: '404'
    }
  ]
  constructor(
    private menusService: MenuService,
    private router: Router
  ) {
  }

  setDynamicRoutes(routes: Routes) {

    this.menusService.subMenus$.subscribe(res => {
      res.forEach(sMenu => {
        let index = routes.findIndex(route => route.path === sMenu.sRoute)
        if (index !== -1) {
          this.dynamicRoutes.push(routes[index])
        }
      })
      if (environment.production)
        this.router.resetConfig([...this.dynamicRoutes, ...this.defaultRoutes])
    })

  }
}
