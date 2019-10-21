// 用户管理

// 固定的写法，暴露出state
export const state = ()=>{
    return {
        // 采用接口返回的数据结构
        userInfo: {
            token: "",
            user: {}
        }
    }
}

// 存放的是同步修改state的方法
export const mutations = {
    // mutaion下的值必须是一个函数，函数中会有一个固定的参数state，第二个参数是用户调用方法时候传进来
    // data是登录成功后返回的对象数据
    setUserInfo(state, data){
        state.userInfo = data;
    }
};

// 存放的是异步方法
export const actions = {

    // 登录
    async login(store, data){
        let res = await this.$axios({
            url: "/accounts/login",
            method: "POST",
            data,
        });
        if(res.status === 200 ) {
            store.commit("setUserInfo", res.data);
        }
        return res;
    },

    // 注册
    async register(store, data){
        let res = await this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        });
        if( res.status===200 ){
            store.commit("setUserInfo", res.data);
        }
        return res;
    },

    // 发送验证码
    async sendCaptcha(store, data){
        let res = await this.$axios({
            url: "/captchas",
            method:"POST",
            data: {
                tel: data
            }
        });
        return res;
    }

};