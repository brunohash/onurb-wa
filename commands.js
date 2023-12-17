const clima = require('./modules/clima/index.js')
const sticker = require('./modules/sticker/index.js')

const comandos = {
    '/clima':{
        'pasta': clima,
        'status': true
    },
    '/s':{
        'pasta': sticker,
        'status': true
    }
}

module.exports = comandos;