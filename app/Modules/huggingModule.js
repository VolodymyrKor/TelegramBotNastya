//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const HUGGING_BUTTON_LABELS = {
    hug: 'Обійняти ще раз',
    backToMain: constants.GENERAL_BUTTON_LABELS.backToMain
};
const HUGGING_BUTTONS = [
    [HUGGING_BUTTON_LABELS.hug],
    [HUGGING_BUTTON_LABELS.backToMain],
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case HUGGING_BUTTON_LABELS.hug:
            bot.sendMessage(msg.chat.id, 'АЯЯЯЯЙЙЙЙЙЙ.... Ти неймовірна сильна:***** Просто монстр:*');
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.HUGGING_BUTTONS = HUGGING_BUTTONS;