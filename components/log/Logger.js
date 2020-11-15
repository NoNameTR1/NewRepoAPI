import kafka from '../kafka';

export default class Logger {
  /**
   * @param {BaseLog, ErrorLog} data
   */
  static log = (data) => {
    kafka.log({
      ...data,
    });
  };
}
