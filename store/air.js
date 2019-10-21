// 机票管理

export const state = ()=>{
    return {
        // 历史记录是一个数组，数组中的每一项是对象
        history: []
    }
}

// 同步修改state的方法
export const mutations = {
    setHistory(state, data){
        state.history.unshift(data);
    }
}