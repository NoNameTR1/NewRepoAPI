module.exports = (container, log) => {
  return {
    login: async () => {
      log('Login test');
      let user = await container.membershipService.loginHandler.login({
        ere: '123',
      });
      console.log(user);
      return user;
    },
    test2: async () => {
      console.log('its worked');
    },
  };
};
