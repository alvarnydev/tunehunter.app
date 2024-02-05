import { sendMessage } from '@/utils/telegramUtils';

export const logError = (error: Error, info: { customMessage?: string; componentStack?: string }) => {
  sendMessage(
    `tunehunter.app error! %0A
    Error message: ${error.message} %0A
    Custom error message: ${info.customMessage} %0A
    Stack trace: ${info.componentStack}`
  );
};
