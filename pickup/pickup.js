'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const { Consumer } = require('sqs-consumer');

const topic = 'arn:aws:sns:us-west-2:937917306820:pickup';
const faker = require('faker');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/937917306820/pickup-queue',
  handleMessage: handler
});

function handler(message) {
  console.log(message);
}




setInterval(() => {
  let box = {
    storeName: 'Wallingford',
    orderID: faker.random.number(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
    date: Date()
  };

  const params = {
    TopicArn: topic,
    Message: JSON.stringify(box),
  };

  sns.publish(params).promise().then(console.log).catch(console.error);
}, 10000);



app.on('error', (err) => {
  console.error(err.message);
});
app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
