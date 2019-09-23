<template>
  <div>
    <!-- <img src="../src/assets/img/img11.jpg" class="img-fluid" alt> -->
    <div style="position: relative">
      <appHead></appHead>
    </div>
    <div class>
      <router-view></router-view>
    </div>

    <appFooter></appFooter>
  </div>
</template>

<script>
import appHead from "@/components/header";
import appFooter from "@/components/footer";

export default {
  data() {
    return {};
  },
  components: {
    appHead,
    appFooter
  }
};
</script>

<style lang="scss">
</style>
