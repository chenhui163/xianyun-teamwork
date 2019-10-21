<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input
                v-model="form.password" 
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {

    // 数据
    data(){

        // 确认密码的校验的方法
        // rule: 当前的规则，一般是用不上这个参数
        // value: 输入框的值
        // callback: 回调函数。该函数必须要调用，调用时候可以传递错误的对象信息
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            // 表单数据对象
            form: {
                username: "",
                captcha: "",    // 验证码
                nickname: "",
                password: "",
                checkPassword: ""   // 确认密码
            },
            // 表单验证规则
            // validator验证的validatePass2是一个回调函数
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
            
        }
    },

    // 方法
    methods:{
        // 发送验证码
        async handleSendCaptcha(){
            // 如果手机号为空，无法发送手机验证请求
            if(!this.form.username){
                this.$message.error("请输入手机号");
                return ;
            }

            // 使用store.dispatch调用actions中的发送验证码功能
            const res = await this.$store.dispatch("user/sendCaptcha", this.form.username);

            const code = res.data.code;
            // 验证码弹窗提示
            if(res.status===200){
                this.$alert(`${code}`, '注册验证码', {
                    confirmButtonText: '确定'
                });
            }
        },
        // 注册
        handleRegSubmit(){
            // 进行表单非空验证
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    // 获取接口需要的数据
                    const { checkPassword, ...props } = this.form;

                    // 使用store.dispatch调用actions中的注册功能
                    const res = await this.$store.dispatch("user/register", props);

                    if( res.status===200 ){
                        this.$message.success("注册成功！");
                        // 跳转到首页
                        this.$router.push("/");
                    }
                }
            });
        }
    }

}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>