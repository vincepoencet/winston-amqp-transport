Winston AMQP transport.

This transport publish logs to a topic exchange.

```javascript
const AMQPTransport = require('winston-amqp');

const amqpTransport = new AMQPTransport({
  uri: 'amqp://localhost',
  exchangeType: 'topic'
  exchange: 'logs',
  routingKey: 'my.company.logs',
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    amqpTransport,
  ]
});
```