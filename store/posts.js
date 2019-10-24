export const state = ()=>{
    return {
        postLists:[

        ]
    }
}
export const mutations = {
    setPosts(state,data){
        state.postLists.push(data)
    },
    coverPosts(state,data){
        state.postLists = data
    }
}