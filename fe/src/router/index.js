import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    meta: { requiresAuth: false },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about-us",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    props: true,
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/scents",
    name: "Scent",
    props: true,
    meta: { requiresAuth: false },
    component: () => import("../views/Scents.vue"),
    children: [
      {
        path: "",
        name: "scentList",
        props: true,
        meta: { requiresAuth: false },
        component: () =>
          import("../components/scentNoteComponents/default.vue"),
      },
      {
        path: ":noteSlug",
        name: "noteDetails",
        props: true,
        meta: { requiresAuth: false },
        component: () =>
          import("../components/scentNoteComponents/noteDetails.vue"),
      },
    ],
  },
  {
    path: "/blogs",
    name: "Blogs",
    props: true,
    meta: { requiresAuth: false },
    component: () => import("../views/Blogs.vue"),
  },
  {
    path: "/brands",
    name: "Brands",
    props: true,
    meta: { requiresAuth: false },
    component: () => import("../views/Brand.vue"),
    children: [
      {
        path: ":brandSlug",
        name: "brandDetails",
        props: true,
        meta: { requiresAuth: false },
        component: () =>
          import("../components/brandComponents/brandDetails.vue"),
      },
      {
        path: "",
        name: "brandList",
        meta: { requiresAuth: false },
        props: true,
        component: () => import("../components/brandComponents/brandList.vue"),
      },
    ],
  },
  {
    path: "/perfumes",
    name: "Perfume",
    props: true,
    meta: { requiresAuth: false },
    component: () => import("../views/Perfume.vue"),
    children: [
      {
        path: "",
        name: "nonePerfume",
        props: true,
        component: () => import("../components/perfumeComponents/none.vue"),
      },
      {
        path: ":perfumeSlug",
        name: "perfumeDetail",
        props: true,
        component: () =>
          import("../components/perfumeComponents/perfumeDetails.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    props: true,
    meta: { requiresAuth: true },
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/order",
    name: "Order",
    props: true,
    meta: { requiresAuth: true },
    component: () => import("../components/orderComponents/core.vue"),
    children: [
      {
        path: "/order",
        name: "Order default",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("../views/Order.vue"),
      },
      {
        path: "/order/:orderId",
        name: "Order detail",
        props: true,
        meta: { requiresAuth: true },
        component: () =>
          import("../components/orderComponents/detail-order.vue"),
      },
    ],
  },
  //Back to home
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
