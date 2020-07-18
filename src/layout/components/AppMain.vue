<template>
  <section class="app-main">
    <transition
      name="fase-transform"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "AppMain"
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.app-main {
  padding: 15px;
}
</style>