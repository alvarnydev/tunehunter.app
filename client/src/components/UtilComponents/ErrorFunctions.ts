import { sendMessage } from '@/components/UtilComponents/TelegramUtils';

export const logError = (error: Error, info: { customMessage?: string; componentStack?: string }) => {
  sendMessage(
    `traxtrove.com error! %0A
    Error message: ${error.message} %0A
    Custom error message: ${info.customMessage} %0A
    Stack trace: ${info.componentStack}`
  );
};
