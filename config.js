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
    dbConnstring: 'mongodb://<thubz>:<@Lungithuba94>@ds243317.mlab.com:43317/letscode',
    sessionKey: 'WolaLetsCode'
}
