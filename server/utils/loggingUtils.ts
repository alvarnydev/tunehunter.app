import { LogRequest } from '../types';
const chatId = process.env.VITE_TELEGRAM_CHAT_ID || '';
const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN || '';

export const logMessage = async (req: LogRequest): Promise<number> => {
  const { error, info } = req.body;
  const message = `<< rekordstore.com >> %0A
  Error message: ${error.message} %0A
  Custom error message: ${info.customMessage} %0A
  Stack trace: ${info.componentStack}
  `.substring(0, 400);

  const requestURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

  const res = await fetch(requestURL);
  return res.status;
};
