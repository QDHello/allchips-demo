import Vue from 'vue'
import Vuex from 'vuex'
import { UserState } from './modules/user'
import { AppStore } from './modules/app'
import { ITagsViewState } from './modules/tag-view'

Vue.use(Vuex)

export interface RootState {
  user: UserState;
  app: AppStore;
  tagVIews: ITagsViewState
}

export default new Vuex.Store<RootState>({})
