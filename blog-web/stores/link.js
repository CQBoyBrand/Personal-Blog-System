/**
 * Author：brand
 * Creation Time：2019-03-19 21:39
 * Email：brandhuang@qq.com
 */
export const state = () => ({

  // 友链列表
  list: {},


})

export const mutations = {
  // 获取友链列表
  GET_LINK_SUCCESS(state, data) {
    state.list = data
  },
}
