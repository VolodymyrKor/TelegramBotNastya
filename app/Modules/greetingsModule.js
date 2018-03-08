//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const GREETINGS_BUTTON_LABELS = {
    hi: 'ПРИВІТ)))',
    backToMain: constants.GENERAL_BUTTON_LABELS.backToMain
};

const GREETINGS_BUTTONS = [
    [GREETINGS_BUTTON_LABELS.hi], [GREETINGS_BUTTON_LABELS.backToMain]
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case GREETINGS_BUTTON_LABELS.hi:
            bot.sendMessage(msg.chat.id, 'І ТОБІ ПРИВІТ)))) Як ти? Як справулі? Чим займаєшся?');
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.GREETINGS_BUTTONS = GREETINGS_BUTTONS;