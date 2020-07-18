<template>
  <div
    id="tag-views-container"
    class="tag-views-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="item in visitedViews"
        :key="item.path"
        tag="span"
        ref="tag"
        :class="isActive(item) ? 'active': ''"
        :to="{path: item.path, query: item.query, fullPath: item.fullPath}"
        class="tag-view-item"
        @click.middle.native="!isAffix(item)?closeSelectedView(item):''"
        @contextmenu.prevent.native="openMenu(item, $event)"
      >
        {{item.meta.title}}
        <span
          v-if="!isAffix(item)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedView(item)"
        ></span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left: left+'px', top: top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag()">刷新</li>
      <li @click="closeSelectedView(selectedTag)">关闭</li>
      <li @click="closeOtherTag(selectedTag)">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { TagViewsModule, ITagView } from "@/store/modules/tag-view";
import { RouteConfig } from "vue-router";
import { routes } from "@/router";
import ScrollPane from "./ScrollPane.vue";
import path from "path";
@Component({
  name: "TagViews",
  components: {
    ScrollPane
  }
})
export default class extends Vue {
  private visible: boolean = false;
  private left: number = 0;
  private top: number = 0;
  private selectedTag: ITagView = {};
  private delIndex: any = null;
  private affixTags: ITagView[] = [];

  get visitedViews() {
    return TagViewsModule.visitedViews;
  }

  @Watch("$route")
  private onRouteChange() {
    this.addTags();
    this.moveToCurrentTag();
  }
  @Watch("visible")
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener("click", this.closeMenu);
    } else {
      document.body.removeEventListener("click", this.closeMenu);
    }
  }

  mounted() {
    this.initTags();
    this.addTags();
  }

  private addTags() {
    TagViewsModule.addVisitedViews(this.$route);
  }
  private initTags() {
    this.affixTags = this.filterTagViews(routes); //类数组对象
    for (let tag of this.affixTags) {
      if (tag.name) {
        TagViewsModule.addVisitedViews(tag);
      }
    }
  }
  private moveToCurrentTag() {
    const tags = this.$refs.tag as any;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          console.log(tag, "==tag");

          (this.$refs.scrollPane as ScrollPane).moveToTarget(tag);
          if (tag.to.fullPath !== this.$route.fullPath) {
            TagViewsModule.updateVisitedView(this.$route);
          }
          break;
        }
      }
    });
  }
  private handleScroll() {
    this.closeMenu();
  }
  private isActive(route: ITagView) {
    return route.fullPath === this.$route.fullPath;
  }
  private isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix;
  }
  // 筛选固定tag
  private filterTagViews(
    routes: RouteConfig[],
    basePath: string | undefined = "/"
  ) {
    let tags: ITagView[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        });
      }
      if (route.children) {
        const childTags = this.filterTagViews(route.children, route.path);
        tags = [...tags, ...childTags];
      }
    });
    return tags;
  }
  private closeSelectedView(tag: ITagView) {
    this.delIndex = this.visitedViews.findIndex(
      v => v.fullPath === tag.fullPath
    );
    TagViewsModule.delVisitedViews(tag);
    this.toNextTag();
  }
  // 关闭标签跳转到下个tag
  private toNextTag() {
    let url: string | undefined = "";
    if (this.delIndex > 0) {
      if (this.delIndex == this.visitedViews.length - 1) {
        url = this.visitedViews[this.delIndex].fullPath;
      } else {
        url = this.visitedViews[this.delIndex - 1].fullPath;
      }
      this.$router.push({ path: url });
    } else {
      this.$router.push({ path: "/", replace: true }); //replace:true,仅刷新不添加路由
    }
  }
  private openMenu(tag: ITagView, e: any) {
    const menuMinWidth = 105;
    const offetLeft = this.$el.getBoundingClientRect().left;
    const offsetWidth = (this.$el as HTMLElement).offsetWidth;
    const maxLeft = offsetWidth - menuMinWidth;
    const left = e.clientX - offetLeft + 15;
    this.left = left > maxLeft ? maxLeft : left;
    this.selectedTag = tag;
    this.visible = true;
    this.top = e.clientY;
  }
  private refreshSelectedTag() {
    this.$router.push(`${this.selectedTag.fullPath}`);
  }
  private closeOtherTag(tag: ITagView) {
    TagViewsModule.delOtherVisitedViews(tag);
    this.$router.push({ path: tag.fullPath, replace: true });
  }
  private closeAllTags() {
    TagViewsModule.delAllVisitedViews();
    let url = this.visitedViews[0].fullPath;
    this.$router.push({ path: url, replace: true });
  }
  private closeMenu() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.tag-views-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tag-view-item {
    display: inline-block;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-right: 5px;
    margin-top: 4px;
    &:first-child {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    position: absolute;
    z-index: 3000;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgb(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
