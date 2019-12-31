import netferejs from '../../../netfere-ts/node';
import { AxiosClass } from '../../../netfere-ts/node/axios';
const pinyin = require('pinyin');
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
type INetfereJs = typeof netferejs;

export interface INetfere extends INetfereJs {
    md5: (value: string) => string;
    pinyin: (source: string) => string;
    ObjectId: (value?: string) => mongoose.Types.ObjectId;
    query: (options: any) => Promise<any>;
}

const ExNetfere: INetfere = {
    ...netferejs,
    md5(source: string): string {
        const md5 = crypto.createHash('md5');
        md5.update(source);
        return md5.digest('hex');
    },
    pinyin(source: string): string {
        return source ? pinyin(source, {
            style: pinyin.STYLE_NORMAL,
            heteronym: false
        }).join('').toLocaleLowerCase() : '';
    },
    ObjectId(value?: string) {
        if (value) {
            return mongoose.Types.ObjectId(value);
        } else {
            return mongoose.Types.ObjectId();
        }
    },
    query(options: any): Promise<any> {
        const instance = new AxiosClass({
            interceptor: false
        });
        return instance.query(options);
    }
};
export function NetfereInit(app: any) {
    global.$ = ExNetfere;
    return {
        think: {
            $: ExNetfere
        },
        service: {
            $: ExNetfere
        },
        controller: {
            $: ExNetfere
        },
        context: {
            $: ExNetfere
        }
    };
}
