import { think } from 'thinkjs';
export default class extends think.Controller {
  __before() {
    this.token = {};
    this.sockets = [];
  }
  __call() {
    return this.json(global.$.res('无效的路由请求'));
  }
}
