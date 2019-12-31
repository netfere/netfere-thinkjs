const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongoose');
const websocket = require('think-websocket');
import { NetfereInit } from '../lib/netfere';
import { think } from 'thinkjs';

let hreadTimer: any = null;
// 在websocket的controller中添加默认Action
const websocketResult = websocket(think.app);
Object.assign(websocketResult.controller, {
  openAction() {
    if (hreadTimer) {
      clearInterval(hreadTimer);
    }
    hreadTimer = setInterval(() => {
      this.emit('dohread', new Date().getTime());
    }, 5000);
  },
  closeAction() {
    if (hreadTimer) {
      clearInterval(hreadTimer);
      hreadTimer = null;
    }
  },
  emitAction() {
    const { event, data } = this.wsData;
    const key = event + 'Action';
    if (typeof this[key] === 'function') {
      this[key](event, data, this.wsCallback);
    } else {
      if (this.wsCallback) {
        this.wsCallback({ success: false, msg: '服务端缺少' + key + '方法' });
      } else {
        this.emit(event, { success: false, msg: '服务端缺少' + key + '方法' });
      }
    }
  }
});
module.exports = [
  NetfereInit(think.app),
  view,
  model(think.app),
  cache,
  session,
  mongo(think.app),
  websocketResult
];
