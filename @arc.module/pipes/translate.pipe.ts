import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IUnit } from '../models/interfaces/unit.interface';
import { LanguageService } from "../services/language.service";
@Pipe({
  name: "TranslatePipe"
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {

  }
  transform(phrase: string, language: string = null): any {
    return this.languageService.translate(phrase, language)
  }
}
