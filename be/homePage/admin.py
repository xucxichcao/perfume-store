from django.contrib import admin
from .models import brandList, ratevote, scentNote, perfume, rate, cartDetail, order, orderDetail
# Register your models here.

admin.site.register(scentNote)
admin.site.register(perfume)
admin.site.register(brandList)
admin.site.register(rate)
admin.site.register(ratevote)
admin.site.register(cartDetail)
admin.site.register(order)
admin.site.register(orderDetail)
