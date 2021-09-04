export interface IFullTelegramLogItem {
  dstUnitFk: number;
  duration: number;
  requestData: string;
  requestId: number;
  responseData: string;
  responseId: number;
  simulated: boolean;
  srcUnitFk: number;
  telegramLogDate: Date;
  telegramLogId: number;
  userId: number;
}