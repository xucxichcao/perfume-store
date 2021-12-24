<template>
  <div class="order">
    <orderIndex></orderIndex>
  </div>
</template>

<script>
export default {
  components: {
    orderIndex: () => import("../components/orderComponents/index.vue")
  }
};
</script>
