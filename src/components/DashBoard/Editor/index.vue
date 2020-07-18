<template>
  <div>
    <pan-thumb :avatar="avatar">
      Your roles:
      <span
        v-for="(item,index) in roles"
        :key="index"
        class="info-role"
      >{{item}}</span>
    </pan-thumb>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import PanThumb from "./PanThumb.vue";
import { UserModule } from "@/store/modules/user";
@Component({
  name: "Editor",
  components: {
    PanThumb
  }
})
export default class extends Vue {
  get roles() {
    return UserModule.roles;
  }
  get avatar() {
    return UserModule.avator;
  }
}
</script>
<style lang="scss" scoped>
.info-role {
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}
</style>