export const getBotUpdates = () =>
  fetch('https://api.telegram.org/bot{token}/getUpdates').then((response) => response.json());

export const sendMessage = (text: string) => {
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`);
};
