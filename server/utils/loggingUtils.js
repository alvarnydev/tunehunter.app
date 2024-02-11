"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessage = void 0;
const chatId = process.env.TELEGRAM_CHAT_ID || '';
const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
const origin = process.env.ALLOW_ORIGIN || '';
const logMessage = async (req) => {
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
exports.logMessage = logMessage;
