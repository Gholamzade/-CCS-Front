
export const PATTERN_INPUT_HOUR = /^(2[0-3]|[0-1][0-9]|[0-9])$/;
export const PATTERN_INPUT_MINUTE = /^([0-5][0-9]|[0-9])$/;
export const PATTERN_INPUT_SECOND = /^([0-5][0-9]|[0-9])$/;
export const PATTERN_DATE_TIME = /([12]\d{3})-(1[0-2]|0?[1-9])-(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?)) (2[0-3]|[0-1][0-9]|[0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/;
export const PATTERN_DATE = /([12]\d{3})-(1[0-2]|0?[1-9])-(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))$/;
export const PATTERN_TIME = /(2[0-3]|[0-1][0-9]|[0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/;

export const LIMIT_TIMES = {
  minHour: 0,
  maxHour: 24,
  minMinute: 0,
  maxMinute: 60,
  minSecond: 0,
  maxSecond: 60,
}
