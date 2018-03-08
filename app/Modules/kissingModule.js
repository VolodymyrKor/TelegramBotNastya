//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const KISSING_BUTTON_LABELS = {
    kiss: 'Поцілувати ніжно-ніжно',
    backToMain: constants.GENERAL_BUTTON_LABELS.backToMain
};
const KISSING_BUTTONS = [
    [KISSING_BUTTON_LABELS.kiss],
    [KISSING_BUTTON_LABELS.backToMain],
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case KISSING_BUTTON_LABELS.kiss:
            bot.sendMessage(msg.chat.id, 'Уммм.... дуже приємно) Тримай і від мене не менш солодший цьом:*');
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.KISSING_BUTTONS = KISSING_BUTTONS;