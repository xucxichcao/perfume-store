<template>
  <div class="home">
    <home-page-carousel />
    <brand-list />
    <scent-notes />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    homePageCarousel: () =>
      import("../components/homeComponents/homePageCarousel.vue"),
    brandList: () => import("../components/homeComponents/brandList.vue"),
    scentNotes: () => import("../components/homeComponents/scentNotes.vue")
  }
};
</script>
