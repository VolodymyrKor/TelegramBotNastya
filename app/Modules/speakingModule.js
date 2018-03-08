//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const SPEAKING_BUTTON_LABELS = {
    howAreYou: 'Як справи?',
    whatAboutPlans: 'Які плани на вечір?',
    veryMiss: 'Дуже скучила...',
    whereAreUou: 'Де ти є?'
};

const SPEAKING_BUTTONS = [
    [SPEAKING_BUTTON_LABELS.howAreYou, SPEAKING_BUTTON_LABELS.whatAboutPlans],
    [SPEAKING_BUTTON_LABELS.veryMiss, SPEAKING_BUTTON_LABELS.whereAreUou],
    [constants.GENERAL_BUTTON_LABELS.backToMain]
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case SPEAKING_BUTTON_LABELS.howAreYou:
            bot.sendMessage(msg.chat.id, 'Та нічого так) Досить непогано. А у тебе як ділішкі?');
            break;
        case SPEAKING_BUTTON_LABELS.whatAboutPlans:
            bot.sendMessage(msg.chat.id, 'Хм... зараз погляну у свій записник... ... ... Ага, планів немає) А що? Ми можемо піти погуляти?');
            break;
        case SPEAKING_BUTTON_LABELS.veryMiss:
            bot.sendMessage(msg.chat.id, 'І яяяяяяя... Дуже-дуже. Просто до неймовірності:*********');
            break;
        case SPEAKING_BUTTON_LABELS.whereAreUou:
            bot.sendMessage(msg.chat.id, 'Не знаю де Вова, а я в комп\'ютері, телефоні, усюди де є інтернет)))');
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.SPEAKING_BUTTONS = SPEAKING_BUTTONS;