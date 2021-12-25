<template>
  <div class="home">
    <home-page-carousel />
    <cur-best />
    <brand-list />
    <scent-notes />
  </div>
</template>

<script>
import CurBest from "../components/homeComponents/curBest.vue";
// @ is an alias to /src

export default {
  components: {
    homePageCarousel: () =>
      import("../components/homeComponents/homePageCarousel.vue"),
    brandList: () => import("../components/homeComponents/brandList.vue"),
    scentNotes: () => import("../components/homeComponents/scentNotes.vue"),
    CurBest,
  },
};
</script>
