const TelegramBot = require('node-telegram-bot-api');
const constants = require('./Helpers/constants');

let botInstance;
let botIsStarted = false;

module.exports.getBotInstance = () => {
    if (!botIsStarted) {
        botIsStarted = true;
        botInstance = new TelegramBot(constants.TOKEN, {
            polling: true
        })
    }
    return botInstance;
};

module.exports.buildMarkup = (keyboard, keyboardType = 'keyboard') => {
    return {
        reply_markup: {
            [keyboardType]: keyboard
        }
    }
};