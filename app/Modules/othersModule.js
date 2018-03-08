//-----------------------------------------------------------------------------
// Modules
//-----------------------------------------------------------------------------
const constants = require('../Helpers/constants');
const botConfiguration = require('../botConfig');
const request = require('request');
const main = require('../index');

const bot = botConfiguration.getBotInstance();

const OTHER_BUTTON_LABELS = {
    moneyCourse: 'Курс гривні',
    backToMain: constants.GENERAL_BUTTON_LABELS.backToMain
};
const OTHER_BUTTONS = [
    [OTHER_BUTTON_LABELS.moneyCourse],
    [OTHER_BUTTON_LABELS.backToMain],
];
const MONEY_LABELS = {
    USD: {
        TEXT: 'Долар',
        CALLBACK_DATA: 'USD'
    },
    EUR: {
        TEXT: 'Євро',
        CALLBACK_DATA: 'EUR'
    }
};
const MONEY_BUTTONS = [
    [{
        text: MONEY_LABELS.USD.TEXT,
        callback_data: MONEY_LABELS.USD.CALLBACK_DATA
    }],
    [{
        text: MONEY_LABELS.EUR.TEXT,
        callback_data: MONEY_LABELS.EUR.CALLBACK_DATA
    }]
];

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.on('message', msg => {
    switch (msg.text) {
        case OTHER_BUTTON_LABELS.moneyCourse:
            chooseMoneyType(msg);
            break;
    }
});

bot.on('callback_query', query => {
    switch (query.data) {
        case MONEY_LABELS.USD.CALLBACK_DATA:
        case MONEY_LABELS.EUR.CALLBACK_DATA:
            sendMoneyCourse(query);
            break;
    }
});

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------
function chooseMoneyType(msg) {
    bot.sendMessage(msg.chat.id, 'Вибери тип:',
        botConfiguration.buildMarkup(MONEY_BUTTONS,
        constants.KEYBOARD_TYPES.inline_keyboard))
}

function sendMoneyCourse(query) {
    bot.answerCallbackQuery({
        callback_query_id: query.id,
        text: `Відповідь у форматі: 1${query.data} = X грн.`
    });
    
    let data;
    const base = query.data;
    const symbol = 'UAH';
    
    request(`https://data.fixer.io/api/latest?access_key=4b569ab7beb8d22434da49b007be79ec&base=${base}&symbols=${symbol}`,
        (error, response, body) => {
            if (error) throw new Error(error);
            
            if(response.statusCode === 200) {
                data = JSON.parse(body);
    
                const html = `<b>1 ${query.data}</b> = <em>${data.rates[symbol]}</em>`;
    
                bot.sendMessage(query.message.chat.id, html, {
                    parse_mode: 'HTML'
                })
            }
        });
}

//-----------------------------------------------------------------------------
// EXPORTS
//-----------------------------------------------------------------------------
module.exports.OTHER_BUTTONS = OTHER_BUTTONS;


// let a = {
//     id: '1694394310414144952',
//     from: {
//             id: 394506917,
//             is_bot: false,
//             first_name: 'Vova',
//             last_name: 'Joker',
//             username: 'Vovanln',
//             language_code: 'en-US'
//     }, message: {
//         message_id: 617,
//         from: {
//             id: 551340768,
//             is_bot: true,
//             first_name: 'VovaLoveNastya',
//             username: 'VovaLoveNastyaAlwaysBot'
//         },
//         chat: {
//             id: 394506917,
//             first_name: 'Vova',
//             last_name: 'Joker',
//             username: 'Vovanln',
//             type: 'private'
//         },
//         date: 1520344327,
//         text: 'Вибери тип:'
//     },
//     chat_instance: '-8598004316991307089',
//     data: 'USD'
// };