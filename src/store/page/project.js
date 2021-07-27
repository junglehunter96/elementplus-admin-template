const state = {
    projcode: ''
}

const mutations = {
    setProjcode(state, projcode) {
        state.projcode = projcode
    }
}

const actions = {
    
}

const layoutState = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default layoutState