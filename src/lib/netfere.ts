import netferejs, { AxiosClass, AxiosRequestConfig, AxiosResponse } from '../../../netfere-ts';
import { encode, decode } from 'jwt-simple';
const pinyin = require('pinyin');
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { think } from 'thinkjs';
type INetfereJs = typeof netferejs;

export interface INetfere extends INetfereJs {
    md5: (value: string) => string;
    pinyin: (source: string) => string;
    ObjectId: (value?: string) => mongoose.Types.ObjectId;
    query: (options: AxiosRequestConfig) => Promise<any>;
    jwt: {
        encode: (iss: string, expires: Date | number | string, data: any) => { token: string, expires: number },
        decode: (token: string) => { success: boolean, payload?: { iss: string; data: any; expires: number } }
    };
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
    query(options: AxiosRequestConfig): Promise<any> {
        return new AxiosClass().query(options);
    },
    jwt: {
        encode(iss: string, expires: Date | number | string, data: any) {
            if (typeof expires === 'string' && /^(-)?(\d+)(s|m|h|d|M|y)$/.test(expires)) {
                expires = netferejs.date().add(expires).getTimeStamp();
            } else {
                expires = netferejs.date(expires).getTimeStamp();
            }
            const token = encode({
                iss, expires, data,
            }, think.config("jwtSecret"));
            return { token, expires };
        },
        decode(token: string) {
            try {
                const payload = decode(token, think.config("jwtSecret"));
                if (payload.expires > new Date().getTime()) {
                    return { success: true, payload };
                } else {
                    return { success: false, payload };
                }
            } catch (e) {
                return { success: false };
            }
        }
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