<template>
  <div class="pan-item">
    <div class="pan-info">
      <div class="pan-info-container">
        <slot></slot>
      </div>
    </div>
    <div
      class="pan-thumb"
      :style="{'backgroundImage':`url(${avatar})`}"
    >

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "PanThumb"
})
export default class extends Vue {
  @Prop({ default: "" }) private avatar!: string;
}
</script>
<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  &:hover .pan-thumb {
    transform: rotate(-110deg);
  }
  &:hover .pan-info p a {
    opacity: 1;
    transform: translateX(0px) rotate(0deg);
  }
  .pan-info {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    .pan-info-container {
      padding: 20px;
      text-align: center;
      h3 {
        color: #fff;
        text-transform: uppercase;
        position: relative;
        letter-spacing: 2px;
        font-size: 18px;
        margin: 0 60px;
        padding: 22px 0 0 0;
        height: 85px;
        text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
  .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}
</style>