import Base from './base';
let timer: NodeJS.Timeout = null;
export default class extends Base {
    listenerAction(event: string, data: any, callback: any) {
        const result = { ts: new Date().getTime(), msg: '这是服务器返回数据', source: data };
        if (callback) {
            callback(result);
        } else {
            this.emit(event, result);
        }
    }
    timeAction(event: string, data: any) {
        if (data) {
            timer = setInterval(() => {
                this.emit(event, new Date().getTime());
            }, 1000);
        } else {
            timer && clearInterval(timer);
        }
    }
    klineAction(event: string, attr: string) {
        /* const houbi = new Houbi().getInstance();
        houbi.socket({ name: 'kline', symbol: 'btcusdt', period: attr }, (res: any) => {
            this.emit(event, res);
        }); */
    }
}
