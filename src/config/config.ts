// default config
module.exports = {
  workers: 1,
  jwtSecret: "PXger@2j{=LJX=WqLtO;hkH7=vidrP6R&J)!8ji%VnJp^z5*JhiZ!a6xuq[Bm&=i",
  accessTokenName: "x-access-token",
  // 服务器上添加数据库用户 https://blog.csdn.net/dutsoft/article/details/78043053
  mongoConnecting: {
    host: '10.10.10.20',
    port: 39000,
    user: 'tester',
    password: 'tian00di00',
    database: 'test',
    options: {
      useUnifiedTopology: true,
      //  <Boolean> Mongoose 特定选项。如果为true，则此连接将使用createIndex()而不是ensureIndex()进行自动索引构建。
      useCreateIndex: true
    }
  }
};
