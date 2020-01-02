import Base from './base';

export default class extends Base {
  async indexAction() {
    return this.json({
      name: 'netfere-thinkjs',
      version: '1.0.0',
      github: 'https://github.com/netfere/netfere-thinkjs'
    });
  }
  async loginAction() {
    const { token, expires } = this.$.jwt.encode("iss", "1h", { name: 'abc' });
    return this.json({
      success: false, msg: 'error server',
      data: {
        type: "admin", // 用户类型
        roles: ["master"], // 用户权限标识
        token, // 令牌
        expires // token值过期时间
      }
    });
  }
}
