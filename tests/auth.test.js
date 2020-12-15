process.env.NODE_ENV = 'test';

import container from '../plugins';

import { basename } from 'path';

import { expect } from '../test_utils/chai';


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
  
  // Not tested for now.
  it('register', async () => {
    const data = await container.membershipService.registerHandler.register({

    });
    expect(data).to.be.an('object');
  });
});

