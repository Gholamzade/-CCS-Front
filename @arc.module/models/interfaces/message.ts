import { MessageType } from "./confirm-modal";

export interface MessageData {
  type?: MessageType;
  title?: string;
  message?: string;
  hasIcon?: boolean;
  closable?: boolean;
}
