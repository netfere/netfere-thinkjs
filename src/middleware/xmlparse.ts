import { Context } from 'thinkjs';
const getData = (ctx: Context) => {
    return new Promise((resolve, reject) => {
        let buf = '';
        ctx.req.setEncoding('utf8');
        ctx.req.on('data', (chunk: string) => {
            buf += chunk;
        });
        ctx.req.on('end', () => {
            global.$.xmlToJson(buf).then(resolve).catch(reject);
        });
    });
};
module.exports = () => {
    return async (ctx: Context, next: () => void) => {
        if (ctx.method === 'POST' && ctx.is('text/xml')) {
            ctx.state.xml = await getData(ctx);
        }
        return next();
    };
};