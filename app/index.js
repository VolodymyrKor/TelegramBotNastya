//-----------------------------------------------------------------------------
// Modules  
//-----------------------------------------------------------------------------
const constants = require('./Helpers/constants');
const botConfiguration = require('./botConfig');
const bot = botConfiguration.getBotInstance();

//-----------------------------------------------------------------------------
const greetingsModule = require('./Modules/greetingsModule');
const speakingModule = require('./Modules/speakingModule');
const huggingModule = require('./Modules/huggingModule');
const kissingModule = require('./Modules/kissingModule');
const missingModule = require('./Modules/missingModule');
const othersModule = require('./Modules/othersModule');

const START_BUTTON_LABELS = {
    hello: 'Привітатись)',
    speak: 'Поговорити',
    hug: 'Обійняти',
    kiss: 'Поцілувати',
    miss: 'Я скучила(',
    other: 'Інше...'
};
const START_BUTTONS = [
    [START_BUTTON_LABELS.hello, START_BUTTON_LABELS.speak, START_BUTTON_LABELS.hug],
    [START_BUTTON_LABELS.kiss, START_BUTTON_LABELS.miss, START_BUTTON_LABELS.other]
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.onText(/\/start/, msg => {
    console.log(`User with name ${msg.from.first_name} ${msg.from.last_name} start conversation with bot`);
    sendGreeting(msg)
});

bot.on('message', msg => {
    switch (msg.text) {
        // GENERAL BUTTONS
        case constants.GENERAL_BUTTON_LABELS.backToMain:
            bot.sendMessage(msg.chat.id, 'Повертаємось на головну)',
                botConfiguration.buildMarkup(START_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        
        // START BUTTONS
        case START_BUTTON_LABELS.hello:
            bot.sendMessage(msg.chat.id, 'Hellooooooo))',
                botConfiguration.buildMarkup(greetingsModule.GREETINGS_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        case START_BUTTON_LABELS.speak:
            bot.sendMessage(msg.chat.id, 'Давай) Я з радістю:*',
                botConfiguration.buildMarkup(speakingModule.SPEAKING_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        case START_BUTTON_LABELS.hug:
            bot.sendMessage(msg.chat.id, 'Ойойойо, як сильно)) Чуть не задушила) Я теж тебе обіймаю:*',
                botConfiguration.buildMarkup(huggingModule.HUGGING_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        case START_BUTTON_LABELS.kiss:
            bot.sendMessage(msg.chat.id, ':**************************************************',
                botConfiguration.buildMarkup(kissingModule.KISSING_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        case START_BUTTON_LABELS.miss:
            bot.sendMessage(msg.chat.id, 'І яяяяя. Я більше навіть, я скучив так багато, що аж краю не видно:*',
                botConfiguration.buildMarkup(missingModule.MISSING_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
        case START_BUTTON_LABELS.other:
            bot.sendMessage(msg.chat.id, 'Допомога на всі випадки життя:',
                botConfiguration.buildMarkup(othersModule.OTHER_BUTTONS, constants.KEYBOARD_TYPES.keyboard));
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------
function sendGreeting(msg) {
    const answer = `Привіт, ${msg.from.first_name}\nЩо ти бажаєш зробити?`;
    
    bot.sendMessage(msg.chat.id, answer,
        botConfiguration.buildMarkup(START_BUTTONS, constants.KEYBOARD_TYPES.keyboard))
}

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.START_BUTTONS = START_BUTTONS;