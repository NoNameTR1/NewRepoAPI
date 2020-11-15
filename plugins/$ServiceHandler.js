/**
 * Service Handler
 * @property {$Container} container
 * @property {function} log
 */
class $ServiceHandler {
  /**
   * @type {$Container}
   */
  container;

  /**
   * @type {function}
   */
  log;

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
  /**
   *
   * @param {$ServiceHandler} serviceHandler
   * @returns {Promise<void>}
   */
  async bind(serviceHandler) {
    serviceHandler.container = this.container;
    serviceHandler.log = this.log.bind(serviceHandler);
  }

  async initialize() {
    await this.doInitialization();
  }

  async doInitialization() {
    this.log('Handlers initializing');
    let names = Object.getOwnPropertyNames(this);
    for (let name of names) {
      let isContainer = this[name].constructor.name === '$Container';
      let isStorage = this[name].constructor.name.endsWith('Storage');
      if (!isContainer && !isStorage) {
        await this.bind(this[name]);
        if (this[name].initialize) {
          await this[name].initialize();
        }
      }
    }
    this.log('Handlers initialized');
  }
}

export default $ServiceHandler;
