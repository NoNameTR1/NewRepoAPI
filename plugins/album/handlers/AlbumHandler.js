import { albumService } from '~services';

class AlbumHandler {
  /**
   * @param {id=user_id:Intager}
   * @returns {Object<albumsbyid>}
   */
  async myAlbums(id) {
    const result = await albumService.fetchAlbumByUid(id);
    return result;
  }
  /**
   * @param no
   * @returns {Object<AllAlbums>}
   */
  async allAlbums() {
    const result = await albumService.fetchAlbums();
    return result;
  }
  /**
   * @param {id=Album_id:Intager}
   * @returns {Object<album ByAlbum's id >}
   */
  async albumById(id) {
    const result = await albumService.fetchAlbumById(id);
    return result;
  }
}

export default AlbumHandler;
