import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators"
import { Route } from "vue-router"
import store from "@/store"
import variables from '@/styles/_variables.scss'

// Partial只声明部分属性
export interface ITagView extends Partial<Route> {
  title?: string
}

export interface ITagsViewState {
  visitedViews: ITagView[];
  cachedViews: (string | undefined)[]
}

@Module({ dynamic: true, store, name: "tagViews" })
class TagViews extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = []
  public cachedViews: (string | undefined)[] = []

  @Mutation
  private ADD_VISITED_VIEWS(view: ITagView) {
    if (this.visitedViews.some(v => v.fullPath == view.fullPath)) return
    this.visitedViews.push(Object.assign({}, view, { title: view.meta.title || 'no-name' }))
  }
  @Mutation
  private DEL_VISITED_VIEWS(view: ITagView) {
    let index = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
    this.visitedViews.splice(index, 1)
  }
  @Mutation
  private ADD_CACHED_VIEWS(view: ITagView) {
    if (view.name == null) return
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) this.cachedViews.push(view.name)
  }
  @Mutation
  private DEL_CACHED_VIEWS(view: ITagView) {
    if (view.name == null) return
    let index = this.cachedViews.indexOf(view.name)
    this.cachedViews.splice(index, 1)
  }
  @Mutation
  private DEL_OTHER_VISITED_VIEWS(view: ITagView) {
    this.visitedViews = this.visitedViews.filter(v => v.meta.affix || v.fullPath === view.fullPath)
  }
  @Mutation
  private DEL_OTHER_CACHED_VIEWS(view: ITagView) {
    if (view.name === null) return
    let index = this.cachedViews.indexOf(view.name)
    this.cachedViews = index > -1 ? this.cachedViews.slice(index, index + 1) : []
  }
  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = this.visitedViews.filter(v => v.meta.affix)
  }
  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }
  @Mutation
  private UPDATE_VISITED_VIEWS(view: ITagView) {
    let index = this.visitedViews.findIndex(item => item.name == view.name && item.path == view.path)
    this.visitedViews.splice(index, 1, view)
  }
  @Mutation
  private UPDATE_CACHED_VIEWS(view: ITagView) {
    if (view.name === null) return
    let index = this.cachedViews.indexOf(view.name)
    this.cachedViews.splice(index, 1, view.name)
  }

  @Action
  public addVisitedViews(view: ITagView) {
    this.ADD_VISITED_VIEWS(view)
    this.ADD_CACHED_VIEWS(view)
  }
  @Action
  public delVisitedViews(view: ITagView) {
    this.DEL_VISITED_VIEWS(view)
    this.DEL_CACHED_VIEWS(view)
  }
  @Action
  public delOtherVisitedViews(view: ITagView) {
    this.DEL_OTHER_VISITED_VIEWS(view)
    this.DEL_OTHER_CACHED_VIEWS(view)
  }
  @Action
  public delAllVisitedViews() {
    this.DEL_ALL_VISITED_VIEWS()
    this.DEL_ALL_CACHED_VIEWS()
  }
  @Action
  public updateVisitedView(view: ITagView) {
    this.UPDATE_VISITED_VIEWS(view)
    this.UPDATE_CACHED_VIEWS(view)
  }

}
export const TagViewsModule = getModule(TagViews)