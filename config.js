'use strict'

module.exports = {
    mailer: {
        service: 'Gmail',
        auth: {
            user: 'tsmmamba@gmail.com',
            pass: 'LiveLifeBlessed@2019'
        }
    },
    //links to DB - letscode locally
    //dbConnstring: 'mongodb://127.0.0.1:27017/letscode',

    //mLab DB - AWS
    dbConnstring: 'mongodb://thubzDB:Lungithuba94@ds157956.mlab.com:57956/siyacoder',
    sessionKey: 'WolaLetsCode'
}
