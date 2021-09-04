export interface ConfirmModal {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  messageIcon?: string;
  inputData?: any;
  messageType?: MessageType;
  messageDirection?: 'rtl' | 'ltr';
  titleDirection?: 'rtl' | 'ltr';
}

export type MessageType = 'info' | 'success' | 'warning' | 'danger' | 'primary'

export interface ConfirmModalResult {
  result: boolean;
  messageType?: MessageType;
}
