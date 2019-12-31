import Base from './base';

export default class extends Base {
  indexAction() {
    return this.json({
      id: this.$.pinyin("张三"),
      name: 'netfere-thinkjs',
      version: '1.0.0',
      git: 'https://github.com/netfere/netfere-thinkjs',
      time: this.$.date().toString()
    });
  }
}
