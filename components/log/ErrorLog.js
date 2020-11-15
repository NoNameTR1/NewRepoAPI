import kafka from '~components/kafka';

export default class ErrorLog {
  constructor(data, kind) {
    this.data = data;
    this.kind = kind;
    this.time = new Date();
    this.send();
  }

  prepareData() {
    return {
      data: { ...this.data },
      kind: this.kind,
      time: this.time,
    };
  }

  send() {
    let msg = this.prepareData();
    kafka.logError(msg);
  }
}
