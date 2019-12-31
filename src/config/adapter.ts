const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const socketio = require('think-websocket-socket.io');
const path = require('path');
import { think } from "thinkjs";
const config = require('./config');
const isDev = think.env === "development";

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mongo',
  common: {
    logConnect: false,
    logSql: false,
    logger: (msg: string) => think.logger.info(msg)
  },
  mongo: config.mongoConnecting
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

exports.websocket = {
  type: 'socketio',
  common: {},
  socketio: {
    handle: socketio,
    pingTimeout: 6000, // 客户端在没有收到服务器端的响应时，等待多少毫秒数
    pingInterval: 25000, // 服务器端在发送响应包前延迟多少毫秒
    /**
     * 这两个参数将会影响的是响应延迟，客户端在知道服务不可用之前仍然需要等待一段时间。
     * 举个例子，如果下行TCP连接没有关闭，大概是由于网络故障，
     * 但是客户端不得不等待pingTimeout+pingInterval这个长的毫秒数才能得知disconnect（未连接成功）这一事件
     */
    // allowOrigin: '127.0.0.1:8360',  // 默认所有的域名都允许访问
    path: '/socket.io',             // 默认 '/socket.io'
    adapter: null,                  // 默认无 adapter
    messages: {
      open: '/websocket/open',
      close: '/websocket/close',
      emit: '/websocket/emit'
    },
    // 如果需要多个命名空间连接，将messages设置为数组，并增加namespace内容
    /* messages: [{
      open: '/websocket/open',
      close: '/websocket/close',
      login: '/websocket/login'
    }, {
      namespace: 'client',
      open: '/websocket/open',
      close: '/websocket/close'
    }] */
  }
};