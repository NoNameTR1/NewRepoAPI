import container from '~plugins';
import { genericErrorHandler } from '~errors';

export async function myAlbums(req, res) {
  try {
    const result = await container.albumService.albumHandler.myAlbums(
      req.params.id
    );
    return res.send(result.data);
  } catch (err) {
    const { status, response } = genericErrorHandler(err, err.stack);
    return res.status(status).json(response);
  }
}

export async function allAlbums(req, res) {
  try {
    const result = await container.albumService.albumHandler.allAlbums();
    return res.send(result.data);
  } catch (err) {
    const { status, response } = genericErrorHandler(err, err.stack);
    return res.status(status).json(response);
  }
}

export async function albumById(req, res) {
  try {
    const result = await container.albumService.albumHandler.albumById(
      req.params.id
    );
    return res.send(result.data.slice(0, 8));
  } catch (err) {
    const { status, response } = genericErrorHandler(err, err.stack);
    return res.status(status).json(response);
  }
}

// Host, status, statusText
