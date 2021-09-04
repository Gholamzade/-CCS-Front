import { SharedComponentsModule } from './@shared-components/shared-components.module';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../@arc.module/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SettingsService } from '@arc.module/services/settings.service';
import { LanguageService } from '@arc.module/services/language.service';
import { ArcModule } from '@arc.module/arc.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProductionPlanPageModule } from './pages/production-plan/production-plan-page.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

function load(http: HttpClient, service: SettingsService): (() => Promise<boolean>) {
  return service.init();
}
function loadLanguage(http: HttpClient, service: LanguageService): (() => Promise<boolean>) {
  return service.init();
}
@NgModule({
  declarations: [
    AppComponent,
    // TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    MaterialModule,
    ArcModule,
    AppRoutingModule,
    ProductionPlanPageModule,
    // FontAwesomeModule,
  ],
  exports: [
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: load,
    deps: [
      HttpClient,
      SettingsService,
    ],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: loadLanguage,
    deps: [
      HttpClient,
      LanguageService
    ],
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
