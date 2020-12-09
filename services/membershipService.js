import {User} from '../models';

export async function login(username, password) {
  if (username === 'zg' && password === '123') {
    return {
      id: 1,
      isAuthenticated: true,
      accessToken: null,
      refreshToken: null,
      currentUser: { email: 'emrejx.abi@gmail.com' },
      roles: [0],
      isBusy: false,
      error: null,
    };
  }
  return false;
}

export async function getUserById(id){
  const user = await User.get({id: id});
  return user;
}

export async function isUsernameExist(username) {
  const record = await User.get({username:username});
  return record;
}