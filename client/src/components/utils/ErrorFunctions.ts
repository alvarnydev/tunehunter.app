import { sendMessage } from './TelegramUtils';

export const logError = (
  error: Error,
  info: { customMessage?: string; componentStack?: string }
) => {
  sendMessage(
    `buythattrack.com error! %0A
    Error message: ${error.message} %0A
    Custom error message: ${info.customMessage} %0A
    Stack trace: ${info.componentStack}`
  );
};
