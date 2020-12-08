const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;

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
};

const client = new cassandra.Client(options);

async function rows() {
  const rs = await client.execute('SELECT * FROM system.local');
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);
}

rows();

// client.on('log', (level, loggerName, message) => {
//   console.log(`${level} - ${loggerName}:  ${message}`);
// });

export default client;
