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
