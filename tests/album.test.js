process.env.NODE_ENV = 'test';

import container from '../plugins';

import { basename } from 'path';

const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);
import _ from 'lodash';

const expect = chai.expect;

/**
 * @returns {Filename} to Console
 */
console.log(basename(__filename));

describe('Album services', () => {
  /**
   * If a function return a value but don't have a property named title, it will fail.
   * For now, each of the album services tests works according to above rule.
   */
  it('should fetch albums by uid', async () => {
    const res = await container.albumService.albumHandler.myAlbums(1);
    expect(_.some(res.data, 'title')).to.be.true;
  });

  it('should fetch by id', async () => {
    const res = await container.albumService.albumHandler.albumById(1);
    expect(_.some(res.data, 'title')).to.be.true;
  });

  it('should fetch all albums', async () => {
    const res = await container.albumService.albumHandler.allAlbums();
    expect(_.some(res.data, 'title')).to.be.true;
  });
});
