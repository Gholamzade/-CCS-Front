import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILanguage, ILanguageData, IPhrases } from '../models/interfaces/language.interface';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class LanguageService {


  public defaultLanguage: string
  public direction: string
  public allLanguageSymbols = []
  public allPhrases: IPhrases[] = []

  get selectedLanguage() {
    return localStorage.getItem('language');
  }
  set selectedLanguage(value: string) {
    this.setDefaultLang(value);
    let selectLang = this.allLanguages.find(lang => lang.langSymbol === value);
    let direction: Direction = 'ltr';
    if (selectLang) {
      direction = selectLang.direction as Direction
    }
    this.setDirection(direction);
    location.reload();
  }

  private allLanguages: ILanguage[]
  private languagesJson: ILanguageData

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) matDialogDefaults: MatDialogConfig<any>) {
    matDialogDefaults.direction = this.getDirection()
  }

  init(): () => Promise<boolean> {

    return () => this.http
      .get('assets/language.json')
      .toPromise()
      .then((res: ILanguageData) => {
        this.languagesJson = res;
        this.allLanguages = res?.languages as ILanguage[];
        this.allLanguages.forEach(lang => {
          this.allLanguageSymbols.push(lang.langSymbol)
        });
        this.allPhrases = this.languagesJson.phrases;
        return true;
      });
  }

  translate(phrase: string, language: string = null) {
    let lang: string = language
    if (lang == null || lang == undefined || lang == '') {
      if (this.selectedLanguage != null)
        lang = this.selectedLanguage;
      else
        lang = this.defaultLanguage;
    }

    phrase = phrase.trimEnd().trimStart();
    // phrase = phrase.toLowerCase();
    let selectedLang = this.allLanguages.find(lg => {

      return lg.langSymbol.toLowerCase() === lang.toLowerCase()
    })
    if (!selectedLang) {
      console.error('not found language')
      return phrase;
    }

    // let lowercasePhrases = Object.keys(phrases).reduce((acc, key) => {
    //   acc[key.trimEnd().trimStart().toLowerCase()] = phrases[key];
    //   return acc;
    // }, {});

    if (this.allPhrases[phrase] && this.allPhrases[phrase][selectedLang.langIndex]) {
      return this.allPhrases[phrase][selectedLang.langIndex];
    } else {
      // console.error(`not found phrases for (${phrase}) for (${lang}) language `)
      return phrase;
    }

  }

  setDefaultLang(defaultLanguage) {
    localStorage.setItem('language', defaultLanguage);
    this.defaultLanguage = defaultLanguage;
  }

  getDefaultLang() {
    let lang = localStorage.getItem('language')
    if (lang === null || lang === undefined) {
      this.setDefaultLang("en");
      return "en";
    }
    return lang;
  }

  setDirection(direction: Direction = "ltr") {
    localStorage.setItem('direction', direction);
    this.direction = direction;
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = this.direction
    htmlTag.lang = this.selectedLanguage
  }

  getDirection() {
    let dir = localStorage.getItem('direction') as Direction
    if (dir === null || dir === undefined){
      this.setDirection("ltr");
      return "ltr";
    }
    return dir;
  }

  start() {
    let defaultLang = this.getDefaultLang();
    if (defaultLang === 'null' || defaultLang === undefined || defaultLang === null || !defaultLang) {

      this.defaultLanguage = this.allLanguages[0].langSymbol
      this.setDefaultLang(this.defaultLanguage);
    } else {
      this.defaultLanguage = defaultLang
    }
    let dir = this.getDirection()
    this.setDirection(dir)
  }
}
