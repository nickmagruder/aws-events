'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:937917306820:pickup';
const orderItem = process.env[2];

const order = {
  storeName: 'Wallingford',
  orderItem,
}

const params = {
  TopicArn: topic,
  Message: JSON.stringify(order),
};

sns.publish(params).promise().then(console.log).catch(console.error);
