import { sendMessage } from './TelegramUtils';

export const logError = (
  error: Error,
  info: { customMessage?: string; componentStack?: string }
) => {
  sendMessage(
    `buythattrack.com error\n\nError message: ${error.message}\n Custom error message: ${info.customMessage}\n\nStack trace: ${info.componentStack}`
  );
};
