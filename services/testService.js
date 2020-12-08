import csdra from '~components/cassandra/client';

export async function test() {
  const query = await csdra.execute('SELECT * FROM system.local');
  return query;
}

export async function asGeneral() {
  const query = await csdra.execute('SELECT * from system_schema');
  return query;
}
