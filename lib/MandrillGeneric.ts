import * as mandrill from 'mandrill-api/mandrill'
import { defaults } from 'lodash'
import { Generic } from '@fabrix/spool-generics'

export class MandrillGeneric extends Generic {
  public config: {
    // Mandrill API key
    key: string
    // Host name for sending eg. cal-style.com
    host: string
    // Protocol for sending eg. https or http
    protocol: string
    // The ReplyTo field in Mandrill templates
    reply_to: string
  }

  /**
   * Create Mandrill Instance
   * @returns {*} Mandrill Instance
   */
  mandrill() {
    return new mandrill.Mandrill(this.config.key)
  }

  /**
   * Build Base Template Content
   * @returns {[*]}
   * @private
   */
  _baseTemplateContent(data) {
    return [
      {
        name: 'domain',
        content: `${ data.protocol || this.config.protocol}://${ data.host || this.config.host}`
      }
    ]
  }
  /**
   * Base message object
   * @returns {*}
   * @private
   */
  _baseMessage(data) {
    return {
      important: true,
      headers: {
        'From-Address': data.from && data.from.email ? data.from.email : this.config.reply_to,
        'Reply-To': data.reply_to || this.config.reply_to
      }
    }
  }

  /**
   * Send a Message
   * @param data
   * @returns Promise.{*}
   */
  send(data) {
    return new Promise((resolve, reject) => {
      const mandrillMessageSchema: {[key: string]: any} = {
        subject: data.subject,
        text: data.text,
        html: data.html,
        to: data.to.map(person => {
          return {
            email: person.email,
            name: person.name,
            type: 'to'
          }
        }),
        from_email: data.from.email,
        from_name: data.from.name
      }
      if (data.global_merge_vars) {
        mandrillMessageSchema.global_merge_vars = data.global_merge_vars
      }
      if (data.recipient_metadata) {
        mandrillMessageSchema.recipient_metadata = data.recipient_metadata
      }
      // Add the Defaults
      const messageContent = defaults(mandrillMessageSchema, this._baseMessage(data))
      const templateContent = defaults(data.template_content || {}, this._baseTemplateContent(data))

      // Construct the Mandrill Message
      const params = {
        'template_content': templateContent, // fill all mc:edit
        'message': messageContent
      }
      // Send Message
      this.mandrill().messages.send(params, function(res) {
        const proxySchema = res.map(response => {
          return {
            email: response.email,
            status: response.status
          }
        })
        return resolve(proxySchema)
      }, function(err) {
        return reject(err)
      })
    })
  }

  sendTemplate(data) {
    return new Promise((resolve, reject) => {
      const mandrillMessageSchema: {[key: string]: any} = {
        subject: data.subject,
        to: data.to.map(person => {
          return {
            email: person.email,
            name: person.name,
            type: 'to'
          }
        }),
        from_email: data.from.email,
        from_name: data.from.name
      }
      if (data.global_merge_vars) {
        mandrillMessageSchema.global_merge_vars = data.global_merge_vars
      }
      if (data.recipient_metadata) {
        mandrillMessageSchema.recipient_metadata = data.recipient_metadata
      }
      // Add the Defaults
      const messageContent = defaults(mandrillMessageSchema, this._baseMessage(data))
      const templateContent = defaults(data.template_content || {}, this._baseTemplateContent(data))

      // Construct the Mandrill Message
      // Construct the Mandrill Message
      const params = {
        'template_name': data.template_name,
        'template_content': templateContent, // fill all mc:edit
        'message': messageContent
      }
      // Send Message
      this.mandrill().messages.sendTemplate(params, function(res) {
        const proxySchema = res.map(response => {
          return {
            email: response.email,
            status: response.status
          }
        })
        return resolve(proxySchema)
      }, function(err) {
        return reject(err)
      })
    })
  }
}

