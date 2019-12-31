import { think } from 'thinkjs';
import BaseServer from './base';
export default class extends think.Service {
    constructor() {
        super();
    }
    async init() {
        console.log(this.$.date().toString());
        console.log('init - /src/service/init.ts');
    }
}
