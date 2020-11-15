import $Service from '../$Service';

import AlbumHandler from './handlers/AlbumHandler';

/**
 * Album Service
 * @property {ALbumService} albumService
 */

class ZGAlbumService extends $Service {
  /**
   * @type {albumService}
   */
  albumHandler = new AlbumHandler();
}

export default ZGAlbumService;
