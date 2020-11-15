import express from 'express';
import * as AlbumController from './album.controller';
//import * as authLimiter from './general.limiter';

const router = express.Router();

router.get('/allAlbums', AlbumController.allAlbums);
router.get('/myalbums/:id', AlbumController.myAlbums);

router.get('/album/:id', AlbumController.albumById);

module.exports = router;
