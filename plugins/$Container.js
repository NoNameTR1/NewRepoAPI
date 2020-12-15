import ZGMembershipService from './membership/ZGMembershipService';
import UserService from './user/UserService';

const fs = require('fs').promises;

/**
 * Container of all services
 * @property {ZGMembershipService} membershipService

 */
export class $Container {
  /**
   * @type {ZGMembershipService}
   */
  membershipService = new ZGMembershipService();
  userService = new UserService();


  log(...msgs) {
    console.log(
      `\x1b[34m${new Date().toLocaleString()}\x1b[0m`,
      `\x1b[35m${this.constructor.name}\x1b[0m:`,
      msgs
        .map((msg, i) => {
          if (i === 0) return `\x1b[33m${msg}\x1b[0m`;

          if (typeof msg === 'object') return JSON.stringify(msg, null, 2);

          return msg;
        })
        .join('/ ')
    );
  }

  /**
   * Initializes plugins
   * @returns {Promise<void>}
   */
  async initialize() {
    this.log('Initializing plugins');

    let names = Object.getOwnPropertyNames(this);
    for (let name of names) {
      let isContainer = this[name].constructor.name === '$Container';
      if (!isContainer) {
        await this.bind(this[name]);
      }
    }

    this.log('Plugins initialized');
  }

  /**
   *
   * @param plugin {$Service}
   * @returns {Promise<void>}
   */
  async bind(plugin) {
    plugin.container = this;
    plugin.log = this.log.bind(plugin);
    if (plugin.initialize) {
      await plugin.initialize();
      this.log(plugin.constructor.name, 'initialized');
    } else {
      this.log(plugin.constructor.name, 'added');
    }
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async test() {
    let lastFileName = null;
    try {
      console.log('\x1b[34m-------- [✞] Internal test starting\x1b[0m');
      let directoryPath = `${__dirname}/__tests__`;
      let fileNames = await fs.readdir(directoryPath);
      fileNames = fileNames.sort();
      for (let fileName of fileNames) {
        lastFileName = fileName;
        const functions = await require(`${directoryPath}/${fileName}`)(
          this,
          () => {
            console.log(`Functions of ${fileName} : `);
          }
        );
        Object.values(functions).forEach((fc) => {
          if (typeof fc === 'function') fc();
        });
        console.log(`\x1b[32m-------- [✓] ${lastFileName}\x1b[0m`);
      }
      console.log('\x1b[34m-------- [✞] Internal test finished\x1b[0m');
    } catch (e) {
      console.error(`\x1b[31m-------- [✕] ${lastFileName}\x1b[0m`);
      console.error(e);
    }
  }
}

export default $Container;
