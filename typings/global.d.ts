//import { INetfere } from '../src/netfere';
import { INetfere } from '../src/lib/netfere';



interface NetfereExtend {
    sockets: any[];
    token: any;
    $: INetfere;
}
declare global {
    namespace NodeJS {
        interface Global extends NetfereExtend {}
    }
}
declare module 'thinkjs' {
    interface Think extends NetfereExtend {}
    interface Controller extends NetfereExtend { }
    interface Context extends NetfereExtend { }
    interface Service extends NetfereExtend {}
}

