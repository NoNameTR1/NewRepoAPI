import { User } from '../models';
import client from '../components/cassandra/client';

/**
 *
 * @param {<String>} username
 * @param {<Encryped_string>} password
 */

export async function getUserByUsername(username, args="*"){
  const query = `SELECT ${args} FROM server.users WHERE username='${username}' ALLOW FILTERING;`;
  const user = await client.execute(query);

  return user.rows[0];
}

/**
 *
 * @param {Int} id
 */
export async function getUserById(id) {
  const user = await User.get({ id: id });
  return user;
}

/**
 *
 * @param {<String>} username
 */
export async function isUsernameExist(username) {
  const query = `SELECT username from server.users WHERE username='${username}' ALLOW FILTERING;`;
  const record = await client.execute(query);
  return record;
}

/**
 *
 * @param {*} email
 */
export async function isEmailExists(email) {
  const query = `SELECT email from server.users WHERE email='${email}' ALTER FILTERING;`;
  const record = await client.execute(query);
  return record;
}

export async function addUser(data) {
  const { name, username, email, password, token, verified } = data;

  const query = `INSERT INTO server.users(id, created_at, email, name, password, "token", username, verified) VALUES (uuid(), now(), '${email}', '${name}', '${password}', '${token}', '${username}', ${verified});`;
  const newUser = await client.execute(query);

  return newUser;
}
