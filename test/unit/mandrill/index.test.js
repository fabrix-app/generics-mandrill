'use strict'
/* global describe, it */
const assert = require('assert')
describe('Email Generic Mandrill', () => {
  let EmailGenericService
  let Mandrill

  before((done) => {
    EmailGenericService = global.app.services.EmailGenericService
    Mandrill = global.app.config.get('generics.mandrill')
    done()
  })

  it('should exist', () => {
    assert(EmailGenericService)
    assert(Mandrill)
  })

  it('should send email', (done) => {
    EmailGenericService.send({
      subject: 'Hello World',
      html: '<h1>Hello World</h1>',
      to: [
        {
          email: 'example@example.com',
          name: 'Test Receiver'
        }
      ],
      from: {
        email: 'example@cali-style.com',
        name: 'Test Sender'
      }
    }, Mandrill)
      .then(response => {
        assert.equal(response[0].email, 'example@example.com')
        assert.equal(response[0].status, 'sent')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('should send email template', (done) => {
    EmailGenericService.sendTemplate({
      subject: 'Hello World',
      to: [
        {
          email: 'example@example.com',
          name: 'Test Receiver'
        }
      ],
      from: {
        email: 'example@cali-style.com',
        name: 'Test Sender'
      },
      template_name: 'test',
      template_content: {}
    }, Mandrill)
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

})
