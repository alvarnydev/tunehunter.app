import { LogRequest } from '../types';
const chatId = process.env.TELEGRAM_CHAT_ID || '';
const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
const origin = process.env.ALLOW_ORIGIN || '';

export const logMessage = async (req: LogRequest): Promise<number> => {
  const { error, info } = req.body;
  const message = `<< ${origin} >> %0A
  Error message: ${error.message} %0A
  Custom error message: ${info.customMessage} %0A
  Stack trace: ${info.componentStack}
  `.substring(0, 400);

  const requestURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
  console.log('requestURL', requestURL);

  const res = await fetch(requestURL);
  return res.status;
};
