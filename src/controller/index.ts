import Base from './base';

export default class extends Base {
  async indexAction() {
    return this.json({
      name: 'netfere-thinkjs',
      version: '1.0.0',
      github: 'https://github.com/netfere/netfere-thinkjs'
    });
  }
}
