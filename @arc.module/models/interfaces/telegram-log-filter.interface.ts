export interface ITelegramLogFilter {
  lastLogId: number;
  direction: number; // 1 or -1
  pageSize: number;
  requestTelegramIds?: number[];
  responseTelegramIds?: number[];
  senderFk?: number;
  receiverFk?: number;
  fromDate?: string;
  toDate?: string;
}