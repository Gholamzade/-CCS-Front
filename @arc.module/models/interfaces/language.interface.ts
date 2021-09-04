export interface IPhrases {
  phrases?: { [key: string]: string[] }
}

export interface ILanguage {
  langIndex: number;
  langSymbol: string;
  langTitle: string;
  direction?: string;
}

export interface ILanguageData {
  languages: ILanguage[],
  phrases: IPhrases[]
}
