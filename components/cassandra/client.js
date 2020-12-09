const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
const Mapper = cassandra.mapping.Mapper;

const options = {
  cloud: {
    secureConnectBundle:
      './components/cassandra/secure-connect-test-server.zip',
  },
  credentials: { username: 'rooterbat', password: '1qa2ws3e' },
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 2,
      [distance.remote]: 1,
    },
  },
  keyspace:'server'
};

const client = new cassandra.Client(options);

async function rows() {
  const rs = await client.execute('SELECT * FROM users');
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);
}

rows();


// client.on('log', (level, loggerName, message) => {
//   console.log(`${level} - ${loggerName}:  ${message}`);
// });

export default client;