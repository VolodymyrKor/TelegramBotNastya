//-----------------------------------------------------------------------------
// Modules  
//-----------------------------------------------------------------------------
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const _ = require('lodash')

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------
const TOKEN = '551340768:AAGlgdsc5Pt-AabcXh62rIgoEbWq56nfk4k'

const bot = new TelegramBot(TOKEN, {
    polling: true
})

const KB = {
    hello   : 'Привітатись',
    hug     : 'Обійняти',
    kiss    : 'Поцілувати',
    scratch : 'Почухати:)',
    miss    : 'Я скучила(',
    back    : 'Назад',
    together: 'Разом',
    vova    : 'Твоя'
}

const PhotosScrs = {
    [KB.together]: [
        '1.jpg',
        '2.jpg'
    ],
    [KB.vova]: [
        '3.jpg'
    ],
}

//-----------------------------------------------------------------------------
// Handlers
//-----------------------------------------------------------------------------
bot.onText(/\/start/, msg => {
    sendGreeting(msg)
})

bot.on('callback_query', query => {
    
    bot.answerCallbackQuery({
        callback_query_id: query.id,
        text: `Ти вибрала ${query.data}`
    })

    const html = `<b>${query.data}</b> can be <em>better</em>`

    bot.sendMessage(query.message.chat.id, html, {
        parse_mode: 'HTML'
    })
})

bot.on('message', msg => {
    switch (msg.text) {
        case KB.hello:
            bot.sendMessage(msg.chat.id, 'Привіт, зайка) Я теж тебе дуже сильно кохаю:* І теж неймовірно скучив(((')
            sendHelloMessages(msg)
            break;
        case KB.scratch:
            bot.sendMessage(msg.chat.id, 'Ой... Ахахахаха, ой, не треба. Ну киця, перестань. Ахахахах, аж сльози виступли)))')
            break;
        case KB.hug:
            bot.sendMessage(msg.chat.id, 'Ойойойо, як сильно)) Чуть не задушила) Я теж тебе обіймаю:*')
            break;
        case KB.kiss:
            bot.sendMessage(msg.chat.id, ':**************************************************')
            break;
        case KB.miss:
            sendPhotoToUser(msg.chat.id)
            break;
        case KB.back:
            sendGreeting(msg, false)
            break;
        case KB.vova:
        case KB.together:
            sendPhotoByName(msg)
            break;            
    }
})

//-----------------------------------------------------------------------------
// Functions
//-----------------------------------------------------------------------------
function sendPhotoToUser(chatId) {
    bot.sendMessage(chatId, `Вибери тип фото: `, {
        reply_markup: {
            keyboard: [
                [KB.together, KB.vova],
                [KB.back]
            ]
        }
    })
}

function sendGreeting(msg, sayHello = true) {
    const answer = sayHello ? `Привіт, ${msg.from.first_name}\nЩо ти бажаєш зробити?` : `Що ти бажаєш зробити?`

    bot.sendMessage(msg.chat.id, answer, {
        reply_markup: {
            keyboard: [
                [KB.hello, KB.scratch, KB.miss],
                [KB.hug, KB.kiss]
            ]
        }
    })
}

function sendPhotoByName(msg) {
    const chatId = msg.chat.id
    const photoName = msg.text
    const srcs = PhotosScrs[photoName]
    const src = srcs[_.random(0, srcs.length - 1)]
    
    bot.sendMessage(chatId, 'Завантажую....')

    fs.readFile(`${__dirname}/photo/${src}`, (error, picture) => {
        if(error) throw new Error(error)

        bot.sendPhoto(chatId, picture).then(() => {
            bot.sendMessage(chatId, 'Відправлено)')            
        })
    })
    
}

function sendHelloMessages(msg) {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'Як в тебе справи?', {
        reply_markup: {
            inline_keyboard:[
                [
                    {
                        text: 'Добре',
                        callback_data: 'GOOD'
                    }
                ],
                [
                    {
                        text: 'Не дуже',
                        callback_data: 'CAN BE'
                    }
                ]
            ]
        }
    })
}