from rest_framework import serializers
from .models import brandList, order, orderDetail, ratevote, scentNote, perfume, rate, cartDetail


class brandSerializer(serializers.ModelSerializer):
    class Meta:
        model = brandList
        fields = (
            "id",
            "name",
            "place",
            "route",
            "image",
        )


class scentNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = scentNote
        fields = (
            "id",
            "name",
            "description",
            "route",
            "image",
        )


class perfumeSerializer(serializers.ModelSerializer):
    scentnote = serializers.SlugRelatedField(slug_field='name', read_only=True)
    is_rated = serializers.SerializerMethodField()
    point = serializers.SerializerMethodField()
    longevity = serializers.SerializerMethodField()
    sillage = serializers.SerializerMethodField()

    def get_point(self, obj):
        try:
            return obj.point
        except:
            return None

    def get_longevity(self, obj):
        try:
            return obj.longevity
        except:
            return None

    def get_sillage(self, obj):
        try:
            return obj.sillage
        except:
            return None

    def get_is_rated(self, obj):
        try:
            return obj.isRated
        except:
            return None

    class Meta:
        model = perfume
        fields = (
            "id",
            "name",
            "sname",
            "description",
            "brand",
            "topnote",
            "midnote",
            "basenote",
            "scentnote",
            "yearofreleasing",
            'price',
            'sale',
            "point",
            "longevity",
            "sillage",
            "sex",
            'is_rated',
            "image",
        )


class rateSerializer(serializers.ModelSerializer):
    perfume_id = serializers.PrimaryKeyRelatedField(
        source='perfume', queryset=perfume.objects.all())
    perfume = serializers.StringRelatedField(read_only=True)
    user = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True)
    is_up_voted = serializers.SerializerMethodField()
    is_down_voted = serializers.SerializerMethodField()
    vote_id = serializers.SerializerMethodField()
    vote = serializers.SerializerMethodField()

    def get_vote(self, obj):
        try:
            return obj.vote
        except:
            return None

    def get_is_up_voted(self, obj):
        try:
            return obj.isUpVoted
        except:
            return None

    def get_is_down_voted(self, obj):
        try:
            return obj.isDownVoted
        except:
            return None

    def get_vote_id(self, obj):
        try:
            return obj.voteID
        except:
            return None

    class Meta:
        model = rate
        fields = ('perfume_id', 'perfume', 'user', 'perfumepoint', 'longevity',
                  'sillage', 'content', 'vote', 'is_up_voted', 'is_down_voted',
                  'id', 'vote_id')


class rateVoteSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = ratevote
        fields = (
            'rate',
            'user',
            'point',
        )


class cartDetailSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True)
    perfume_data = perfumeSerializer(source='perfume', read_only=True)

    def create(self, validated_data):
        user = validated_data.get("user", None)
        perfume = validated_data.get("perfume", None)
        cartItem = cartDetail.objects.filter(user=user,
                                             perfume=perfume).first()
        if cartItem is not None:
            cartItem.amount = cartItem.amount + 1
            cartItem.save()
            return cartItem
        else:
            return cartDetail.objects.create(**validated_data)

    class Meta:
        model = cartDetail
        fields = ('id', 'user', 'perfume', 'amount', 'perfume_data')


class orderDetailSerializer(serializers.ModelSerializer):
    perfume_data = perfumeSerializer(source='perfume', read_only=True)

    def create(self, validated_data):
        perfume = validated_data.get('perfume', None)
        amount = validated_data.get('amount', None)
        validated_data.update({"price": perfume.price * amount})
        return orderDetail.objects.create(**validated_data)

    class Meta:
        model = orderDetail
        fields = ('order', 'perfume', 'amount', 'price', 'perfume_data')
        read_only_fields = ('price', 'perfume_data')


class orderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True)
    details = orderDetailSerializer(many=True, read_only=True)
    totalPrice = serializers.SerializerMethodField()

    def get_totalPrice(self, obj):
        try:
            return obj.totalPrice
        except:
            return None

    class Meta:
        model = order
        fields = ('id', 'user', 'status', 'createdDate', 'totalPrice',
                  'details')
        read_only_fields = ('id', 'createdDate', 'status', 'totalPrice')
