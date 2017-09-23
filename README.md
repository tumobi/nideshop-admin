# nideshop-admin
Node.js开源商城NideShop管理后台（基于Node.js、Vue.js、Element UI、Electron）

### 测试版包含功能（待完善）
+ 管理员登录
+ 商品管理
+ 商品分类
+ 品牌管理
+ 会员管理
+ 订单管理

### Build Setup

+ 安装nideshop
[GitHub](https://github.com/tumobi/nideshop)

+ 修改api地址
src/renderer/main.js
```
Axios.defaults.baseURL = 'http://127.0.0.1:8360/admin/';  # admin/ 不可删除
```
+ 运行
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

```

# 测试账号
admin
admin888

喜欢别忘了Star 本项目长期更新完善，欢迎Watch 交流QQ群：497145766


---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
