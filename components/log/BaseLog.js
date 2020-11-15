import kafka from '~components/kafka';

export default class BaseLog {
  constructor(data, kind, time) {
    this.data = data;
    this.kind = kind;
    this.time = time;
    this.send();
  }

  prepareData() {
    return {
      data: this.data,
      kind: this.kind,
      time: this.time,
    };
  }

  send() {
    let data = this.prepareData();
    kafka.log(data);
  }
}
