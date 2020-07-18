<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const tagSpacing = 4;
@Component({
  name: "ScrollPane"
})
export default class extends Vue {
  get scrollWrapper() {
    return (this.$refs.scrollContainer as Vue).$refs.wrap as HTMLElement;
  }

  mounted() {
    window.addEventListener("scroll", this.emitScroll, true);
  }
  beforeDestroy() {
    window.removeEventListener("scroll", this.emitScroll);
  }
  private handleScroll(e: WheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    const scrollWrapper = this.scrollWrapper;
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4;
  }
  private emitScroll() {
    this.$emit("scroll");
  }
  public moveToTarget(currrentTag: HTMLElement) {
    const container = (this.$refs.scrollContainer as Vue).$el as HTMLElement;
    const containerWidth = container.offsetWidth;
    const scrollWrapper = this.scrollWrapper;
    const tagList = this.$parent.$refs.tag as any[];
    console.log(containerWidth, "---width");

    let firstTag = null;
    let lastTag = null;
    if (tagList.length > 0) {
      firstTag = tagList[0];
      lastTag = tagList[tagList.length - 1];
    }
    if (firstTag == currrentTag) {
      scrollWrapper.scrollLeft = 0;
    } else if (lastTag == currrentTag) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth;
    } else {
      let currentIndex = tagList.findIndex(it => it === currrentTag);
      const prevTag = tagList[currentIndex - 1];
      const nextTag = tagList[currentIndex + 1];
      // 后一个tag的offsetleft
      const nextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing;
      // 前一个
      const prevTagOffset = prevTag.$el.offsetLeft - tagSpacing;
      if (nextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
        scrollWrapper.scrollLeft = nextTagOffsetLeft - containerWidth; //还未滚动到currentTag情况
      } else if (prevTagOffset < scrollWrapper.scrollLeft) {
        scrollWrapper.scrollLeft = prevTagOffset;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  position: relative;
}
</style>
<style lang="scss">
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>