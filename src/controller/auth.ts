import { think } from 'thinkjs';
import Base from './base.js';
// access-token的键名
const ACCESSKEY = think.config('accessTokenName');

export default class extends Base {
    __before() {
        super.__before();
        let res = null;
        // let jwt: { iss?: string, expires?: number, data?: any, unique?: any } = {};
        const token = this.isWebsocket
            ? this.websocket.handshake.query[ACCESSKEY] || this.websocket.handshake.headers[ACCESSKEY]
            : this.header(ACCESSKEY) || this.cookie(ACCESSKEY) || this.post(ACCESSKEY) || this.get(ACCESSKEY) || '';
        if (global.$.isEmpty(token)) {
            res = global.$.res({ success: false, msg: '没有登陆' });
        } else {
            const { success, payload } = global.$.jwt.decode(token);
            if (success) {
                this.token = payload.data;
                if (global.$.has(this.token, 'unique')) {
                    this.token.unique = global.$.ObjectId(this.token.unique);
                }
            } else {
                res = global.$.res({ success: false, msg: '登陆已过期' });
            }
        }

        if (res) {
            if (this.isWebsocket) {
                this.emit('message', res);
                return;
            } else {
                return this.json(res);
            }
        }
    }
}