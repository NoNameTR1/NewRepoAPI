process.env.NODE_ENV = 'test';

import container from '../plugins';

import { basename } from 'path';

const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);

const expect = chai.expect;

/**
 * @returns {Filename} to Console
 */

console.log(basename(__filename));

/**
 if data @returns an object, its fail.
*/
describe('Auth', () => {
  it('should login', async () => {
    const data = await container.membershipService.loginHandler.login({
      username: 'zg',
      password: '123',
    });
    expect(data).to.be.an('object');
  });
});
