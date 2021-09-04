// import { formatDate } from "@angular/common";
// import * as moment from "moment";
import * as moment from "moment";
import * as jalaliMoment from "jalali-moment";

export function formatTwoDigitTimeValue(val: number) {
  if (val === null || val === undefined)
    return '00';
  const txt = val?.toString();
  return txt.length > 1 ? txt : `0${txt}`;
}

// declare var require: any;
export class IrisaDate {
  public year: number;
  public month: number;
  public day: number;
  public hour: number;
  public minute: number;
  public second: number;
  private jalaliNow() {

    let jD = this.clone('fa')
    const { date, hours, milliseconds, minutes, months, seconds, years } = jD.toObject()
    this.year = years;
    this.month = months + 1;
    this.day = date;
    this.hour = hours;
    this.minute = minutes;
    this.second = seconds;
    this.locale = 'fa';

  }
  private miladiNow() {
    let d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    this.day = d.getDate();
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds();
    this.locale = 'en';
  }
  constructor(
    public locale: string = 'en',
    nullDate?: boolean,
  ) {

    if (nullDate) {
      this.year = null;
      this.month = null;
      this.day = null;
      this.hour = null;
      this.minute = null;
      this.second = null;
      this.locale = locale;
      return;
    }
    if (locale === 'fa') {
      this.jalaliNow();
    } else if (locale === 'en') {
      this.miladiNow();
    } else {
      this.miladiNow();
    }

  }


  private clone(locale = 'en'): jalaliMoment.Moment {
    return jalaliMoment().clone().locale(locale);
  }

  getMonths(): string[] {
    if (this.locale === 'fa') {
      return [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند'
      ];
    } else {
      return 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    }
  }


  getNumDaysInMonth(locale: string = 'en'): number {
    let clone = this.clone(locale);
    if (locale === 'fa') {
      return clone.month(this.month).jDaysInMonth();
    } else if (locale === 'en') {
      return clone.month(this.month).daysInMonth();
    }
    return 0;
  }

  getTime(): { hour: number, minute: number, second: number } {
    return {
      hour: this.hour, minute: this.minute, second: this.second
    }
  }

  getDate(): { year: number, month: number, day: number } {
    return {
      year: this.year, month: this.month, day: this.day
    }
  }

  private clear() {
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.locale = null;
  }

  public subtractDate(subtraction: IrisaDate) {

    const mDate1 = jalaliMoment(subtraction.toString());
    const mDate2 = jalaliMoment(this.toString());
    const diff = mDate2.diff(mDate1, "seconds");
    return diff;
  }
  toMiladi(): IrisaDate {
    if (this.locale === 'en') {
      return this
      // throw Error("THIS IS NOT A JALALI DATE") ;
    }

    let yearStr = this.year
    let monthStr = formatTwoDigitTimeValue(this.month)
    let dayStr = formatTwoDigitTimeValue(this.day)
    let hourStr = formatTwoDigitTimeValue(this.hour)
    let minuteStr = formatTwoDigitTimeValue(this.minute)
    let secondStr = formatTwoDigitTimeValue(this.second)

    let moment = jalaliMoment(`${yearStr}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`, 'jYYYY-jMM-jDD HH:mm:ss', true)
      .locale('en');
    // const { jy, jm,jd } = jalaliMoment.jConvert.toGregorian(this.year,this.month,this.day)
    // console.log('this.year,this.month,this.day: ', this.year,this.month,this.day);
    // // console.warn(jalaliMoment.jConvert.toGregorian(this.year,this.month,this.day))
    const tempArray = moment.toArray()
    if (tempArray.some(item => isNaN(item))) {
      console.error(tempArray)
      throw new Error("Invalid NAN date");
    }

    const { date, hours, milliseconds, minutes, months, seconds, years } = moment.toObject()
    if (years < 1000 || years > 3000 || months + 1 == 0 || months + 1 > 12) {
      if (years < 1000 || years > 3000) {
        return this
      } else {
        throw new Error("Invalid date");
      }
    }
    this.year = years;
    this.month = months + 1;
    this.day = date;
    this.hour = hours;
    this.minute = minutes;
    this.second = seconds;
    this.locale = 'en';

    return this

  }
  toJalali(): IrisaDate {
    if (this.locale === 'fa') {
      return this
      // throw Error("THIS IS NOT A MILADI DATE");
    }
    let yearStr = this.year
    let monthStr = formatTwoDigitTimeValue(this.month)
    let dayStr = formatTwoDigitTimeValue(this.day)
    let hourStr = formatTwoDigitTimeValue(this.hour)
    let minuteStr = formatTwoDigitTimeValue(this.minute)
    let secondStr = formatTwoDigitTimeValue(this.second)
    let moment = jalaliMoment(`${yearStr}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`, 'YYYY-MM-DD HH:mm:ss', true)
      .locale('fa');

    const tempArray = moment.toArray()
    if (tempArray.some(item => isNaN(item))) {
      console.error(tempArray)
      throw new Error("Invalid NAN date");
    }
    const { date, hours, milliseconds, minutes, months, seconds, years } = moment.toObject()
    if (years < 1000 || years > 1500 || months + 1 == 0 || months + 1 > 12) {
      if (years < 1000 || years > 1500) {
        return this
      } else {
        throw new Error("Invalid date");
      }
    }
    this.year = years;
    this.month = months + 1;
    this.day = date;
    this.hour = hours;
    this.minute = minutes;
    this.second = seconds;
    this.locale = 'fa';
    return this
  }

  // toString(noTime: boolean = false, noSeconds: boolean = false): string {
  //   let tmp = this.year + "/";
  //   if (this.month < 10) tmp += "0";
  //   tmp += this.month + "/";

  //   if (this.day < 10) tmp += "0";
  //   tmp += this.day;

  //   if (noTime) return tmp;

  //   tmp += " ";
  //   if (this.hour < 10) tmp += "0";
  //   tmp += this.hour + ":";

  //   if (this.minute < 10) tmp += "0";

  //   tmp += this.minute;
  //   if (noSeconds) return tmp;

  //   tmp += ":";

  //   if (this.second < 10) tmp += "0";
  //   tmp += this.second;

  //   return tmp;
  // }

  toApiDate(format: string = "YYYY-MM-DD HH:mm:ss"): string {
    let tmp;
    if (this.locale === 'fa') {
      tmp = this.toMiladi();
    }
    else tmp = this;

    const d = new Date();
    d.setFullYear(tmp.year);
    d.setMonth(tmp.month);
    d.setDate(tmp.day);
    d.setHours(tmp.hour);
    d.setMinutes(tmp.minute);
    d.setSeconds(tmp.second);
    format = format.trimStart().trimEnd().replace(/\//g, "-");
    const dateString = jalaliMoment(d).format(format);
    return dateString;
  }

  toDateType(): Date {
    if (this.locale === 'fa') {
      let moment = this.toMomentType()
      return moment.toDate()
    } else if (this.locale === 'en') {
      let str = this.toString()
      return new Date(str)
    } else {
      throw new Error("Invalid locale");

    }
  }

  toMomentType() {
    let yearStr = this.year
    let monthStr = formatTwoDigitTimeValue(this.month)
    let dayStr = formatTwoDigitTimeValue(this.day)
    let hourStr = formatTwoDigitTimeValue(this.hour)
    let minuteStr = formatTwoDigitTimeValue(this.minute)
    let secondStr = formatTwoDigitTimeValue(this.second)
    let moment: jalaliMoment.Moment
    if (this.locale === 'en') {
      moment = jalaliMoment(`${yearStr}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`, 'YYYY-MM-DD HH:mm:ss', true)
        .locale('en');
    } else if (this.locale === 'fa') {

      let jalaliString = `${yearStr}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`;
      if (jalaliString.includes('/')) {
        jalaliString = jalaliString.split('/').join('-')
      }
      const validFormat = [
        'jYYYY-jMM-jDD HH:mm:ss',
        'jYYYY-jMM-jDD HH:mm',
        'jYYYY-jMM-jDD',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY-MM-DD HH:mm',
        'YYYY-MM-DD',
        'DD-MM-YYYY HH:mm:ss',
        'DD-MM-YYYY HH:mm',
        'DD-MM-YYYY',
        'DD-MM-YYYY',
        'jDD-jMM-jYYYY HH:mm:ss',
        'jDD-jMM-jYYYY HH:mm',
        'jDD-jMM-jYYYY'
      ];
      moment = jalaliMoment(jalaliString, validFormat, true).locale('en');

    } else {
      throw new Error("Invalid locale");
    }
    return moment
  }

  toString(withTime: boolean = true, delimiter: string = null) {
    let yearStr = this.year
    let monthStr = formatTwoDigitTimeValue(this.month)
    let dayStr = formatTwoDigitTimeValue(this.day)

    let hourStr = formatTwoDigitTimeValue(this.hour)
    let minuteStr = formatTwoDigitTimeValue(this.minute)
    let secondStr = formatTwoDigitTimeValue(this.second);
    let del = delimiter ? delimiter : '-';

    return withTime ? `${yearStr}${del}${monthStr}${del}${dayStr} ${hourStr}:${minuteStr}:${secondStr}` : `${yearStr}${del}${monthStr}${del}${dayStr}`;
  }

  /** TODO:FIX based other format */
  fromStringToJalali(date: string) {
    this.fromStringToMiladi(date);
    console.warn("this", this)
    let tmp = this.toJalali();
    this.year = tmp.year;
    this.month = tmp.month;
    this.day = tmp.day;
    this.hour = tmp.hour;
    this.minute = tmp.minute;
    this.second = tmp.second;
    this.locale = 'fa';
  }

  /** TODO:FIX based other format */
  fromStringToMiladi(jalaliString: string) {
    jalaliString = jalaliString.split(' ').filter(r => r).join(' ')

    if (this.locale === 'en') {
      throw new Error("Date is en before");
    }

    let miladiString = jalaliMoment.from(jalaliString, 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

    const d = new Date(miladiString);
    this.clear();
    this.locale = 'en';
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.day = d.getDate();
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds();
  }

  fromApiDateToJalali(date: string) {
    let d = new IrisaDate('en');
    d.fromApiDateToMiladi(date);
    return d.toJalali();
  }
  fromApiDateToMiladi(date: string) {
    const d = new Date(date);
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    this.day = d.getDate();
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds();
    this.locale = 'en';
  }
  dayOfWeek(): string {
    let tmp;
    const IS_JALALI = this.locale === 'fa' ? true : false;
    if (this.locale === 'fa') tmp = this.toMiladi();
    else tmp = this;

    const d = new Date();
    d.setFullYear(tmp.year);
    d.setMonth(tmp.month - 1);
    d.setDate(tmp.day);
    d.setHours(tmp.hour);
    d.setMinutes(tmp.minute);
    d.setSeconds(tmp.second);

    if (IS_JALALI) {
      switch (d.getDay()) {
        case 0:
          return "یک شنبه";
        case 1:
          return "دوشنبه";
        case 2:
          return "سه شنبه";
        case 3:
          return "چهارشنبه";
        case 4:
          return "پنج شنبه";
        case 5:
          return "جمعه";
        case 6:
          return "شنبه";
        default:
          return "ERR"
      }
    } else {
      switch (d.getDay()) {
        case 0:
          return "Sun";
        case 1:
          return "Mon";
        case 2:
          return "Tue";
        case 3:
          return "Wed";
        case 4:
          return "Thu";
        case 5:
          return "Fri";
        case 6:
          return "Sat";
        default:
          return "ERR"
      }
    }
  }

  public isLeapYear(): boolean {
    // tslint:disable-next-line: no-use-before-declare
    // return DateUtility.isLeapYear(this.year);
    let isLeapYear: boolean
    let moment = jalaliMoment().locale(this.locale)
    switch (this.locale) {
      case 'fa':
        isLeapYear = moment.year(this.year).jIsLeapYear();
        break;
      case 'en':
        isLeapYear = moment.year(this.year).isLeapYear();
        break;
      default:
        break;
    }
    return isLeapYear;
  }
  public get daysInMonth(): number {
    return this.clone(this.locale).month(this.month).daysInMonth();
  }
}

export class DateUtility {

  public static HoursBefore(base: Date, hours: number): Date {
    const myMoment: jalaliMoment.Moment = jalaliMoment(base);
    myMoment.subtract(hours, "hours");
    return myMoment.toDate();
  }
  public static HoursAfter(base: Date, hours: number): Date {
    const myMoment: jalaliMoment.Moment = jalaliMoment(base);
    myMoment.add(hours, "hours");
    return myMoment.toDate();
  }
  public static SubtractDate(base: Date, subtraction: Date, unit) {
    const mDate1 = jalaliMoment(subtraction);
    const mDate2 = jalaliMoment(base);
    const diff = mDate2.diff(mDate1, unit);
    return diff;
  }
  public static stringToJalaliDate(jalaliString: string) {
    const d = new IrisaDate('fa');
    d.fromStringToJalali(jalaliString);
    return d;
  }
  public static stringToMiladiDate(miladiString: string) {
    const d = new IrisaDate('en');
    d.fromStringToMiladi(miladiString);
    return d;
  }
  public static fromApiDateToJalali(date: string) {
    let d = new IrisaDate('en');
    d.fromApiDateToMiladi(date);
    return d.toJalali();
  }

  public static isLeapYear(year): boolean {
    let tmp = year % 128;

    switch (tmp) {
      case 4:
      case 8:
      case 12:
      case 16:
      case 20:
      case 24:
      case 29:
      case 33:
      case 37:
      case 41:
      case 45:
      case 49:
      case 53:
      case 57:
      case 62:
      case 66:
      case 70:
      case 74:
      case 78:
      case 82:
      case 86:
      case 90:
      case 95:
      case 99:
      case 103:
      case 107:
      case 111:
      case 115:
      case 119:
      case 124:
        return true;
    }

    return false;
  }

  static toApiDate(date: Date | IrisaDate | string | jalaliMoment.Moment, format: string = "YYYY-MM-DD HH:mm:ss"): string {
    if (date === null || date === undefined || date === '') {
      return null;
    }
    format = format.trimStart().trimEnd().replace(/\//g, "-");

    let dateString;
    if (date instanceof IrisaDate) {
      dateString = date.toMomentType().format(format)
    } else if (date instanceof Date) {
      let irisaDate = this.dateToIrisaDate(date)
      dateString = irisaDate.toMomentType().format(format)
    } else if (typeof date === 'string') {
      date = date.trimStart().trimEnd().replace(/\//g, "-");
      date = date.split(' ').filter(r => r).join(' ')
      let irisaDate = DateUtility.stringToMiladi(date)
      dateString = irisaDate.toMomentType().format(format)

    } else if (jalaliMoment.isMoment(date)) {
      let dateObj = date.toDate();
      let irisaDate = this.dateToIrisaDate(dateObj)
      dateString = irisaDate.toMomentType().format(format)
    } else {
      throw new Error("Invalid Type");
    }
    // dateString = dateString.replace(/-/g, "/");
    return dateString;
  }

  static createDate(
    year: number,
    month: number,
    day: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    locale: string
  ): IrisaDate {
    if (month < 1 || month > 12) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 1 and 12.`
      );
    }

    let dayIndex = this.getNumDaysInMonth(locale, year, month - 1);
    if (day < 1 || (day > dayIndex)) {
      throw Error(`Invalid day "${day}". Day index has to be between 1 and ${dayIndex}.`);
    }

    let date = new IrisaDate(locale)
    date.year = year;
    date.day = day;
    date.month = month;
    date.hour = hours;
    date.minute = minutes;
    date.second = seconds;
    date.locale = locale;

    // if (this.getMonth(result) !== month) {
    //   throw Error(`Invalid date ${date} for month with index ${month}.`);
    // }
    // if (!result.isValid()) {
    //   throw Error(`Invalid date "${date}" for month with index "${month}".`);
    // }
    return date;
  }

  static clone(locale = 'en'): jalaliMoment.Moment {
    return jalaliMoment().clone().locale(locale);
  }

  static getNumDaysInMonth(locale: string = 'en', year: number, month: number): number {
    if (locale === 'fa') {
      return jalaliMoment.jDaysInMonth(year, month);
    } else if (locale === 'en') {
      return moment({ year, month }).daysInMonth();
    }
    return 0;
  }

  static stringToMiladi(jalaliString: string) {
    if (jalaliString === null || jalaliString === undefined || jalaliString === '') {
      return null;
    }
    jalaliString = jalaliString.trimStart().trimEnd().replace(/\//g, "-")

    let dateArray = jalaliString.split(' ');
    let onlyDate = dateArray[0];
    let onlyTime = dateArray.length > 1 ? dateArray[1] : "00:00:00";
    let onlyDateArray = onlyDate.split("-")
    let onlyTimeArray = onlyTime.split(":")
    if (onlyDateArray?.length < 3) {
      throw new Error(`Invalid date format ${jalaliString}`);
    }

    let onlyDateString = onlyDateArray.map(x => x.length > 1 ? x : `0${x}`).join('-');
    let onlyTimeString = onlyTimeArray.map(x => x.length > 1 ? x : `0${x}`).join(':');
    jalaliString = `${onlyDateString} ${onlyTimeString}`;

    // jalaliString = jalaliString.split(' ').filter(r => r).join(' ')

    // if (jalaliString.includes('/')) {
    //   jalaliString = jalaliString.split('/').join('-')
    // }
    const validFormat = [
      'jYYYY-jMM-jDD HH:mm:ss',
      'jYYYY-jMM-jDD HH:mm',
      'jYYYY-jMM-jDD',
      'YYYY-MM-DD HH:mm:ss',
      'YYYY-MM-DD HH:mm',
      'YYYY-MM-DD',
      'DD-MM-YYYY HH:mm:ss',
      'DD-MM-YYYY HH:mm',
      'DD-MM-YYYY',
      // 'MM-DD-YYYY HH:mm:ss',
      // 'MM-DD-YYYY HH:mm',
      // 'MM-DD-YYYY',
      'DD-MM-YYYY',
      'jDD-jMM-jYYYY HH:mm:ss',
      'jDD-jMM-jYYYY HH:mm',
      'jDD-jMM-jYYYY'
    ];
    let moment = jalaliMoment(jalaliString, validFormat, true).locale('en');

    if (!moment.isValid()) {
      throw new Error(`Invalid date format ${jalaliString} ( valid format ${validFormat.toString()})`);
    }

    const tempArray = moment.toArray()
    if (tempArray.some(item => isNaN(item))) {
      throw new Error("Invalid date");
    }

    const { date, hours, milliseconds, minutes, months, seconds, years } = moment.toObject()
    if (years < 1000 || years > 2050 || months + 1 == 0 || months + 1 > 12) {
      if (years < 1000 || years > 2050) {
        return this.miladiStringToMiladiObject(jalaliString)
      } else {
        throw new Error("Invalid date");
      }
    }

    let irisaDate = this.createDate(
      years,
      months + 1,
      date,
      hours,
      minutes,
      seconds,
      'en');

    return irisaDate;

  }

  static stringTojalali(miladiString: string) {
    if (miladiString === null || miladiString === undefined || miladiString === '') {
      return null;
    }
    // if (miladiString.includes('/')) {
    //   miladiString = miladiString.split('/').join('-')
    // }
    miladiString = miladiString.trimStart().trimEnd().replace(/\//g, "-")
    let dateArray = miladiString.split(' ');
    let onlyDate = dateArray[0];
    let onlyTime = dateArray.length > 1 ? dateArray[1] : "00:00:00";
    let onlyDateArray = onlyDate.split("-")
    let onlyTimeArray = onlyTime.split(":")
    if (onlyDateArray?.length < 3) {
      throw new Error(`Invalid date format ${miladiString}`);
    }

    let onlyDateString = onlyDateArray.map(x => x.length > 1 ? x : `0${x}`).join('-');
    let onlyTimeString = onlyTimeArray.map(x => x.length > 1 ? x : `0${x}`).join(':');
    miladiString = `${onlyDateString} ${onlyTimeString}`;
    // miladiString = miladiString.split(' ').filter(r => r).join(' ');

    let moment = jalaliMoment(miladiString, [
      'YYYY-MM-DD HH:mm:ss',
      'YYYY-MM-DD HH:mm',
      'YYYY-MM-DD',
      'DD-MM-YYYY HH:mm:ss',
      'DD-MM-YYYY HH:mm',
      'DD-MM-YYYY',
      'D-M-YYYY, HH:mm:ss',
    ], true)
      .locale('fa');
    if (!moment.isValid()) {
      throw new Error(`Invalid date format ${miladiString}`);
    }


    const tempArray = moment.toArray()
    if (tempArray.some(item => isNaN(item))) {
      console.error(tempArray)
      throw new Error("Invalid date");
    }

    const { date, hours, milliseconds, minutes, months, seconds, years } = moment.toObject()
    if (years < 1000 || years > 1500 || months + 1 == 0 || months + 1 > 12) {
      if (years < 1000 || years > 1500) {
        return this.jalaliStringToJaliliObject(miladiString)
      } else {
        throw new Error("Invalid date");
      }
    }
    let irisaDate = this.createDate(
      years,
      months + 1,
      date,
      hours,
      minutes,
      seconds,
      'fa');

    return irisaDate;
  }

  static isDateObject(object: any) {
    return jalaliMoment.isDate(object)
  }

  private static jalaliStringToJaliliObject(jalaliString: string) {
    jalaliString = jalaliString.trimStart().trimEnd()
    let tempArray = jalaliString.split(' ').filter(r => r)//.join(' ');
    let date, time;
    if (tempArray.length > 1) {
      time = tempArray[1]
    } else {
      time = "00:00:00"
    }
    date = tempArray[0]

    // let [year, month, day] = date.split('-')
    // console.log('date.split(): ', date.split('-'));
    // let [hour, minute, second] = time.split(':')
    // console.log('time.split(): ', time.split(':'));
    let [year, month, day] = [0, 0, 0]
    let [hour, minute, second] = [0, 0, 0]
    date = date.replace(/\//g, "-");
    if (/\d{4}\-\d{2}\-\d{2}/.test(date)) {
      [year, month, day] = date.split('-')
    } else if (/\d{2}\-\d{2}\-\d{4}/.test(date)) {
      [day, month, year] = date.split('-')
    } else {
      throw new Error(`Invalid Format ${jalaliString} Must (jYYYY/jMM/jDD HH:mm:ss or jDDj/MM/jYYYY HH:mm:ss)`);
    }

    [hour, minute, second] = time.split(':')

    let irisaDate = this.createDate(
      Number(year),
      Number(month),
      Number(day),
      Number(hour),
      Number(minute),
      second ? Number(second) : 0,
      'fa');

    return irisaDate;

  }

  private static miladiStringToMiladiObject(miladiString: string) {

    miladiString = miladiString.trimStart().trimEnd()
    let tempArray = miladiString.split(' ').filter(r => r)//.join(' ');
    let date, time;
    if (tempArray.length > 1) {
      time = tempArray[1]
    } else {
      time = "00:00:00"
    }
    date = tempArray[0]

    let [year, month, day] = [0, 0, 0]
    let [hour, minute, second] = [0, 0, 0]
    date = date.replace(/\//g, "-");
    if (/\d{4}\-\d{2}\-\d{2}/.test(date)) {
      [year, month, day] = date.split('-')
    } else if (/\d{2}\-\d{2}\-\d{4}/.test(date)) {
      [day, month, year] = date.split('-')
    } else {
      throw new Error(`Invalid Format ${miladiString} Must (YYYY/MM/DD HH:mm:ss or DD/MM/YYYY HH:mm:ss)`);
    }

    [hour, minute, second] = time.split(':')


    let irisaDate = this.createDate(
      Number(year),
      Number(month),
      Number(day),
      Number(hour),
      Number(minute),
      second ? Number(second) : 0,
      'en');
    return irisaDate;

  }

  static dateToIrisaDate(date: Date): IrisaDate {
    let irisaDate = new IrisaDate('en')
    irisaDate.year = date.getFullYear();
    irisaDate.month = date.getMonth() + 1;
    irisaDate.day = date.getDate();
    irisaDate.hour = date.getHours();
    irisaDate.minute = date.getMinutes();
    irisaDate.second = date.getSeconds();
    return irisaDate;
  }

  static isoToJaliliString(date: string, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    if (date == null) {
      return null;
    }
    let moment = jalaliMoment.utc(date).local();

    let jalaliIrisaDate = this.stringTojalali(moment.format(format))

    return jalaliIrisaDate.toString()
  }

  static isoToMiladiString(date: string, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    if (date == null) {
      return null;
    }
    let moment = jalaliMoment.utc(date).local();

    let miladiIrisaDate = this.stringToMiladi(moment.format(format))

    return miladiIrisaDate.toString()
  }

}

// export function DateFormatValidator(locale: string = "en"): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     let validFormat = []
//     console.log(locale);
//     console.log(control);
//     if (locale && locale === 'en') {
//       validFormat = ['YYYY-MM-DD HH:mm:ss',
//         'YYYY-MM-DD HH:mm',
//         'YYYY-MM-DD',
//         'DD-MM-YYYY HH:mm:ss',
//         'DD-MM-YYYY HH:mm',
//         'DD-MM-YYYY'];

//     } else {
//       validFormat = [
//         'jYYYY-jMM-jDD HH:mm:ss',
//         'jYYYY-jMM-jDD HH:mm',
//         'jYYYY-jMM-jDD',
//         'YYYY-MM-DD HH:mm:ss',
//         'YYYY-MM-DD HH:mm',
//         'YYYY-MM-DD',
//         'DD-MM-YYYY HH:mm:ss',
//         'DD-MM-YYYY HH:mm',
//         'DD-MM-YYYY',
//         'jDD-jMM-jYYYY HH:mm:ss',
//         'jDD-jMM-jYYYY HH:mm',
//         'jDD-jMM-jYYYY'
//       ];
//     }
//     if (!control.value) {
//       return null;
//     }
//     let date = control.value;
//     let moment = jalaliMoment(date, validFormat, true).locale(locale);
//     if (!moment.isValid) {
//       return {
//         date: {
//           valid: false
//         }
//       }
//     }
//     return null;
//   };
// }
