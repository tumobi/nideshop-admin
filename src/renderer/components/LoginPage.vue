<template>
    <div class="login">
        <div class="login-box">
            <div class="logo">
                <img src="static/images/logo.png"/>
            </div>
            <div class="body">
                <p class="tips">欢迎使用NideShop后台管理</p>
                <el-form ref="form" :model="form" :rules="rules" label-position="top">
                    <el-form-item label="" prop="username">
                        <el-input v-model="form.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="startLogin" :loading="loading" style="width: 100%;">
                            {{ loading ? '登录中...' : '登录' }}
                        </el-button>
                    </el-form-item>
                </el-form>

                <p class="author">Created by <a href="https://github.com/tumobi" target="_blank">tumobi</a></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '密码不得低于6个字符', trigger: 'blur'},
                    ],
                },
                loading: false,
            }
        },
        components: {},
        methods: {
            startLogin() {

                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }

                    this.loading = true;

                    this.axios.post('http://127.0.0.1:8360/admin/auth/login', {
                        username: this.form.username,
                        password: this.form.password
                    }).then((res) => {
                        console.log(res.data)
                        this.loading = false;
                        if (res.data.errno === 0) {
                            localStorage.setItem('token', res.data.data.token);
                            localStorage.setItem('userInfo', JSON.stringify(res.data.data.userInfo));
                            this.$router.push({name: 'dashboard'});

                        } else {
                            this.$message({
                                type: 'error',
                                title: res.data.errmsg
                            })
                        }

                    }).catch((err) => {
                        console.log(err)
                        this.loading = false;
                    })

                });
            }
        }
    }
</script>
<style>
    .login {
        align-items: center;
        background: #f5f7f9;
        display: flex;
        font-family: Lato, Helvetica, sans-serif;
        justify-content: center;
        text-align: center;
        height: 100%;
        width: 100%;
        color: #656565;
    }

    .login-box {
        width: 320px;
        height: 350px;
        background: #fff;
    }

    .login-box .logo {
        height: 54px;
        background: #324157;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-box .logo img {
        max-height: 30px;
    }

    .login-box .body {
        padding: 15px;
    }

    .login-box .body .tips {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-bottom: 10px;
    }

    .login-box .body .author {
        display: block;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #656565;
        margin-bottom: 10px;
        text-decoration: none;
    }

    .login-box .body .author a {
        text-decoration: none;
    }
</style>
