# nideshop-admin
Node.js开源商城NideShop管理后台（基于Node.js、Vue.js、Element UI、~~Electron~~）

### 此测试版已停止开发，请不要下载使用。最新重构版正在开发中，敬请期待...

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

# 编译成 web ，编译成功后把 dist/web 下的文件上传的http服务器的根目录下
npm run build:web

```

# 测试账号
admin
admin888

喜欢别忘了Star 本项目长期更新完善，欢迎Watch 交流QQ群：497145766


---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
