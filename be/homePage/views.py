from django.db.models.expressions import Exists, OuterRef, Subquery
from django.db.models import Avg, Sum
from django.db.models.fields import DecimalField
from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions
from rest_framework.decorators import permission_classes
from .models import brandList, cartDetail, order, orderDetail, scentNote, perfume, rate, ratevote
from .serializers import brandSerializer, cartDetailSerializer, orderDetailSerializer, orderSerializer, scentNoteSerializer, perfumeSerializer, rateSerializer, rateVoteSerializer
from django.db.models.functions import Coalesce
import django_filters.rest_framework

#Permission


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


# Create your views here.


class brandViewSet(viewsets.ModelViewSet):
    serializer_class = brandSerializer
    queryset = brandList.objects.all()
    permission_classes = (IsAdminOrReadOnly, )


class scentNoteViewSet(viewsets.ModelViewSet):
    serializer_class = scentNoteSerializer
    queryset = scentNote.objects.all()
    permission_classes = (IsAdminOrReadOnly, )
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ('name', )


class perfumeViewSet(viewsets.ModelViewSet):
    serializer_class = perfumeSerializer
    queryset = perfume.objects.all()
    permission_classes = (IsAdminOrReadOnly, )
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ('brand', 'sname', 'scentnote')
    filterset_fields = {
        'brand': ["in", "exact"],
        'scentnote': ["in", "exact"],
        'sname': ["exact"]
    }

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = perfume.objects.annotate(
                isRated=Exists(
                    rate.objects.filter(user=self.request.user,
                                        perfume=OuterRef('pk'))),
                point=Coalesce(Avg('ratings__perfumepoint'),
                               0,
                               output_field=DecimalField()),
                longevity=Coalesce(Avg('ratings__longevity'),
                                   0,
                                   output_field=DecimalField()),
                sillage=Coalesce(Avg('ratings__sillage'),
                                 0,
                                 output_field=DecimalField()),
            )
            return queryset
        else:
            queryset = perfume.objects.annotate(
                point=Coalesce(Avg('ratings__perfumepoint'),
                               0,
                               output_field=DecimalField()),
                longevity=Coalesce(Avg('ratings__longevity'),
                                   0,
                                   output_field=DecimalField()),
                sillage=Coalesce(Avg('ratings__sillage'),
                                 0,
                                 output_field=DecimalField()),
            )
            return queryset


class rateViewSet(viewsets.ModelViewSet):
    serializer_class = rateSerializer
    queryset = rate.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ('perfume', 'user')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = rate.objects.annotate(
                vote=Coalesce(Sum('rate_vote__point'), 0),
                isUpVoted=Exists(
                    ratevote.objects.filter(user=self.request.user,
                                            rate=OuterRef('pk'),
                                            point=1)),
                isDownVoted=Exists(
                    ratevote.objects.filter(user=self.request.user,
                                            rate=OuterRef('pk'),
                                            point=-1)),
                voteID=Subquery(
                    ratevote.objects.filter(user=self.request.user,
                                            rate=OuterRef('pk')).values('id')))
            return queryset
        else:
            queryset = rate.objects.annotate(vote=Sum('rate_vote__point'), )
            return queryset


class rateVoteViewSet(viewsets.ModelViewSet):
    serializer_class = rateVoteSerializer
    queryset = ratevote.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class cartDetailViewSet(viewsets.ModelViewSet):
    serializer_class = cartDetailSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = cartDetail.objects.filter(user=self.request.user)
            return queryset
        else:
            return cartDetail.objects.none()


class orderViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,
                   mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = orderSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = order.objects.filter(user=self.request.user).annotate(
                totalPrice=Coalesce(Sum('details__price'), 0))
            return queryset
        else:
            return order.objects.none()


class orderDetailCreateView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = orderDetailSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return orderDetail.objects.filter(order__user=self.request.user)
