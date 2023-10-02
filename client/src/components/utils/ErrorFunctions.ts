import { sendMessage } from './TelegramUtils';

export const logError = (error: Error, info: { componentStack: string }) => {
  sendMessage(`buythattrack.com error: ${error.message}\n\nStack trace: ${info.componentStack}`);
};
