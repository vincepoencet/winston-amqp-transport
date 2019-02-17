const Transport = require('winston-transport');
const amqp = require('amqplib/callback_api');

module.exports = class AMQPTransport extends Transport {
  constructor(opts) {
    super(opts)

    this.options = opts;

    amqp.connect(this.options.url, (err, conn) => {
      if (err) {
        throw err;
      }

      this.conn = conn;
      this.conn.createChannel((err, ch) => {
        if (err) {
          throw err;
        }

        ch.assertExchange(this.options.exchange, this.options.exchangeType, { durable: this.options.durable || 0 });
        this.ch = ch;
      })
    });
  }

  log(info, callback) {
    if (!this.ch) {
      return callback();
    }

    this.ch.publish(this.options.exchange, `${this.options.routingKey}.logs.${info.level}`
      , Buffer.from(JSON.stringify({...info, timespan: new Date()})));
    callback();
  }
};
