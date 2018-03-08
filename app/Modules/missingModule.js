//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const fs = require('fs');
const _ = require('lodash');

const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const MISSING_BUTTON_LABELS = {
    miss: 'Мені не хватає тебе, приїдь до мене:*',
    together: 'А ми удвох найкраща пара:*',
    backToMain: constants.GENERAL_BUTTON_LABELS.backToMain
};
const MISSING_BUTTONS = [
    [MISSING_BUTTON_LABELS.miss, MISSING_BUTTON_LABELS.together],
    [MISSING_BUTTON_LABELS.backToMain],
];
const PHOTO_SRCS = {
    [MISSING_BUTTON_LABELS.together]: [
        '1.jpg',
        '2.jpg'
    ]
};


//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case MISSING_BUTTON_LABELS.miss:
            bot.sendMessage(msg.chat.id, 'Зайка, вже збираюсь і вийжджаю. Кинь смскою своє місце розташування:*');
            break;
        case MISSING_BUTTON_LABELS.together:
            sendPhotoByName(msg);
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------
function sendPhotoByName(msg) {
    const chatId = msg.chat.id;
    const photoName = msg.text;
    const srcs = PHOTO_SRCS[photoName];
    const src = srcs[_.random(0, srcs.length - 1)];

    bot.sendMessage(chatId, 'Завантажую....');

    fs.readFile(`${__dirname}/../../photo/${src}`, (error, picture) => {
        if (error) throw new Error(error);

        bot.sendPhoto(chatId, picture).then(() => {
            bot.sendMessage(chatId, 'Відправлено)')
        })
    })
}

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.MISSING_BUTTONS = MISSING_BUTTONS;