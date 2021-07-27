import { createStore, useStore as baseUseStore } from 'vuex'
import layout from '/@/store/module/layout'
import { loadStorePage } from '/@/utils/tools'
const page = import.meta.globEager('./page/**/**.js')

export const store = createStore({
    modules: {
        layout,
        ...loadStorePage(page)
    }
})

export function useStore() {
    return baseUseStore()
}
