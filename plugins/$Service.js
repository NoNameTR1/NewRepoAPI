/**
 * Service
 * @property {$Container} container
 * @property {function} log
 * @property {function} bind
 * @property {function} initialize
 */
class $Service {
  /**
   * @type {$Container}
   */
  container;

  /**
   * @type {function}
   */
  log;

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
    this.log('Handlers initializing');
    let names = Object.getOwnPropertyNames(this);
    for (let name of names) {
      let isContainer = this[name].constructor.name === '$Container';
      if (!isContainer) {
        await this.bind(this[name]);
        if (this[name].initialize) {
          await this[name].initialize();
        }
      }
    }
    this.log('Handlers initialized');
  }
}

export default $Service;
