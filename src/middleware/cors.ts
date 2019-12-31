import { Context, Application } from 'thinkjs';

export default function(options?: any, app?: Application) {
    return async (ctx: Context, next: () => void) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With,x_requested_with, Content-Type, Accept,x-access-token');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, WEBSOCKET');
        ctx.set('Access-Control-Allow-Credentials', "true");
        if (ctx.method === 'OPTIONS') {
            ctx.status = 200;
            return;
        }
        return next();
    };
}