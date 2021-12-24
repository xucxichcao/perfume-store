<template>
  <div class="cart">
    <cartIndex></cartIndex>
  </div>
</template>

<script>
export default {
  components: {
    cartIndex: () => import("../components/cartComponents/index.vue")
  }
};
</script>
