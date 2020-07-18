<template>
  <div>
    <component :is="currentRole"></component>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import Admin from "@/components/DashBoard/Admin/index.vue";
import Editor from "@/components/DashBoard/Editor/index.vue";
@Component({
  name: "Dashboard",
  components: {
    Admin,
    Editor
  }
})
export default class extends Vue {
  private currentRole = "admin";
  get roles() {
    return UserModule.roles;
  }
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editor";
    }
  }
}
</script>