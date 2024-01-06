"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessage = void 0;
const chatId = process.env.VITE_TELEGRAM_CHAT_ID || '';
const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN || '';
const logMessage = async (req) => {
    const { error, info } = req.body;
    const message = `rekordstore.com error! %0A
    Error message: ${error.message} %0A
    Custom error message: ${info.customMessage} %0A
    Stack trace: ${info.componentStack}`;
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`);
    return res.status;
};
exports.logMessage = logMessage;
