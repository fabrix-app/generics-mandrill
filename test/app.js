'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {},
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-generics').GenericsSpool
      ]
    },
    generics: {
      mandrill: {
        adapter: require('../dist').MandrillGeneric,
        config: {
          // Mandrill API key
          key: '-ynu-rQJlGEbvaKEIQS30w', // process.env.MANDRILL_KEY,
          // Host name for sending eg. cal-style.com
          host: 'cali-style.com', // process.env.MANDRILL_HOST,
          // Protocol for sending eg. https or http
          protocol: 'https', // process.env.MANDRILL_PROTOCOL,
          // The ReplyTo field in Mandrill templates
          reply_to: 'info@calistyletechnologies.com' // process.env.MANDRILL_REPLY_TO
        }
      }
    }
  }
}, smokesignals.FailsafeConfig)


