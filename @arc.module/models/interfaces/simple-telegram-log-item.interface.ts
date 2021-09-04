export interface ISimpleTelegramLogItem {
  telegramLogId: number;
  telegramLogDate: Date;
  requestId: number;
  responseId?: number;
  //telegramName: string;
  srcUnitFk: number;
  dstUnitFk: number;
  simulated: boolean;
}