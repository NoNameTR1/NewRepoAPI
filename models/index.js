const normalizedPath = require('path').join(__dirname);

import client from '../components/cassandra/client';
import { mapping } from 'cassandra-driver';

const Mapper = mapping.Mapper;

const models = {
  models: {},
};

require('fs')
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if (file !== 'index.js') {
      models.models = {
        ...models.models,
        ...require(normalizedPath + '/' + file),
      };
    }
  });

const mapper = new Mapper(client, models);

const User = mapper.forModel('User');

export { User };
