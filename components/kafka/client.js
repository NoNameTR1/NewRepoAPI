const kafka = require('kafka-node');

/**
 * Send all notification to kafka notification topic
 * @param {emailData} data
 */
export function notification(data) {
  const client = new kafka.KafkaClient({
      kafkaHost: 'localhost:9092,localhost:9093',
      connectTimeout: 1000,
      // in ms for a kafka request to timeout default: 30000
      requestTimeout: 2000,
    }),
    Producer = kafka.Producer,
    producer = new Producer(client);

  producer.on('ready', function () {
    producer.send(
      [
        {
          topic: 'notification',
          messages: JSON.stringify(data),
        },
      ],
      function (err) {
        if (err) console.log(err);
      }
    );
  });
}

export function log(msg) {
  const client = new kafka.KafkaClient({
      kafkaHost: 'localhost:9092,localhost:9093',
      connectTimeout: 1000,
      // in ms for a kafka request to timeout default: 30000
      requestTimeout: 2000,
    }),
    Producer = kafka.Producer,
    producer = new Producer(client);

  producer.on('ready', function () {
    producer.send(
      [
        {
          topic: 'logs',
          messages: JSON.stringify(msg),
        },
      ],
      function (err) {
        if (err) console.log(err);
      }
    );
  });
}

export function logError(msg) {
  const client = new kafka.KafkaClient({
      kafkaHost: 'localhost:9092,localhost:9093',
      connectTimeout: 1000,
      // in ms for a kafka request to timeout default: 30000
      requestTimeout: 2000,
    }),
    Producer = kafka.Producer,
    producer = new Producer(client);

  producer.on('ready', function () {
    producer.send(
      [
        {
          topic: 'errors',
          messages: JSON.stringify(msg),
        },
      ],
      function (err) {
        if (err) console.log(err);
      }
    );
  });
}
