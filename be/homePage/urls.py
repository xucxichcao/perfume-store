from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import brandViewSet, cartDetailViewSet, orderDetailCreateView, orderViewSet, rateVoteViewSet, scentNoteViewSet, perfumeViewSet, rateViewSet

router = DefaultRouter()
router.register("brands", brandViewSet, basename="brands")
router.register("scents", scentNoteViewSet, basename="scents")
router.register("perfumes", perfumeViewSet, basename="perfumes")
router.register("rates", rateViewSet, basename="rates")
router.register("ratevotes", rateVoteViewSet, basename="ratevotes")
router.register("cart", cartDetailViewSet, basename="cart")
router.register("order", orderViewSet, basename="order")
router.register("order-detail", orderDetailCreateView, basename="order-detail")
brands_urlpatterns = [url("api/", include(router.urls))]