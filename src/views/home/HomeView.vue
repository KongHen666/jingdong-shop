<template>
  <div class="wrapper">
    <StaticPart />
    <NearByPart />
  </div>
    <DockerPart :currentIndex="0"/>
</template>

<script>
import StaticPart from "./StaticPart.vue";
import NearByPart from "./NearByPart.vue";
import DockerPart from "../../components/DockerPart.vue";

export default {
  name: "HomeView",
  components: { StaticPart, NearByPart, DockerPart }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  overflow-y: auto;
  touch-action: none;
}
</style>