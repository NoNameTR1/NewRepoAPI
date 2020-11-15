import { get } from 'axios';

export async function fetchAlbums() {
  return await get('https://jsonplaceholder.typicode.com/albums');
}

export async function fetchAlbumByUid(id) {
  return await get('https://jsonplaceholder.typicode.com/albums?userId=' + id);
}

export async function fetchAlbumById(id) {
  return await get(
    'https://jsonplaceholder.typicode.com/albums/' + id + '/photos'
  );
}
