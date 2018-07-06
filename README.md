# generics-mandrill

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

Generic Email Provider for Mandrillapp.com supplied by Spool-generics.

Looking for [Spool-Generics?](https://github.com/fabrix-app/spool-generics)

## Install

```sh
$ npm install --save @fabrix/generics-mandrill
```

## Configure

```js
// config/generics.ts
export const generics = {
  // make the key mandrill, alternatively make the key email_provider to be the default email provider
  mandrill: {
      adapter: require('@fabrix/generic-mandrill').MandrillGeneric,
      config: {
          // Mandrill API key
          key: process.env.MANDRILL_APIKEY,
          // Host name for sending eg. cali-style.com
          host: process.env.MANDRILL_HOST,
          // Protocol for sending eg. https or http
          protocol: process.env.MANDRILL_PROTOCOL,
          // The ReplyTo field in Mandrill templates
          reply_to: process.env.MANDRILL_REPLY_TO
      }
  }
}
```

[npm-image]: https://img.shields.io/npm/v/@fabrix/generics-mandrill.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/generics-mandrill
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/generics-mandrill/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/generics-mandrill/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/generics-mandrill.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/generics-mandrill
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/generics-mandrill.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/generics-mandrill/coverage
