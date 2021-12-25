from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db.models import constraints

# Create your models here.


class brandList(models.Model):
    id = models.CharField(max_length=40, primary_key=True)
    name = models.CharField(max_length=200)
    place = models.CharField(max_length=200)
    route = models.CharField(max_length=200)
    image = models.FileField(upload_to='brand-image',
                             blank=True,
                             validators=[FileExtensionValidator(['svg'])])

    def __str__(self):
        return self.name


class scentNote(models.Model):
    id = models.CharField(max_length=40, primary_key=True)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    route = models.CharField(max_length=200)
    image = models.ImageField(upload_to="scent-image", blank=True)

    def __str__(self):
        return self.name


class perfume(models.Model):
    id = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    sex = models.CharField(max_length=6,
                           choices=[('Nam', 'Nam'), ('Nữ', 'Nữ'),
                                    ('Unisex', 'Unisex')],
                           default='unisex')
    brand = models.ForeignKey(brandList, on_delete=models.CASCADE)
    topnote = models.CharField(max_length=400, null=True)
    midnote = models.CharField(max_length=400, null=True)
    basenote = models.CharField(max_length=400, null=True)
    scentnote = models.ForeignKey(scentNote,
                                  on_delete=models.CASCADE,
                                  null=True)
    yearofreleasing = models.PositiveIntegerField(null=True)
    price = models.IntegerField(default=0)
    sale = models.DecimalField(max_digits=3, decimal_places=2, default=1.00)
    image = models.ImageField(upload_to="perfume-pic", blank=True)

    # @property
    # def point(self):
    #     return self.ratings.aggregate(avg_perfumepoint=Avg('perfumepoint'))['avg_perfumepoint']

    # @property
    # def longevity(self):
    #     return self.ratings.aggregate(avg_longevity=Avg('longevity'))['avg_longevity']

    # @property
    # def sillage(self):
    #     return self.ratings.aggregate(avg_sillage=Avg('sillage'))['avg_sillage']

    def __str__(self):
        return self.name


class rate(models.Model):
    perfume = models.ForeignKey(perfume,
                                on_delete=models.CASCADE,
                                related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    perfumepoint = models.PositiveIntegerField(
        default=0, validators=[MaxValueValidator(5),
                               MinValueValidator(1)])
    longevity = models.PositiveIntegerField(
        default=0, validators=[MaxValueValidator(5),
                               MinValueValidator(1)])
    sillage = models.PositiveIntegerField(
        default=0, validators=[MaxValueValidator(5),
                               MinValueValidator(1)])
    content = models.TextField(default="")

    def __str__(self):
        return (self.user.get_username() + ': ' + self.perfume.name)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'perfume'],
                                    name='rate_once')
        ]


class ratevote(models.Model):
    rate = models.ForeignKey(rate,
                             on_delete=models.CASCADE,
                             related_name='rate_vote')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    point = models.IntegerField(
        default=0, validators=[MaxValueValidator(1),
                               MinValueValidator(-1)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'rate'],
                                    name='vote_rate_once')
        ]


class cartDetail(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             related_name='cart')
    perfume = models.ForeignKey(perfume,
                                on_delete=models.CASCADE,
                                related_name='cart')
    amount = models.PositiveSmallIntegerField(default=1)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'perfume'],
                                    name='no_dupe_item')
        ]


class order(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             related_name='order')
    createdDate = models.DateTimeField(auto_now_add=True, blank=True)
    status = models.CharField(default='Finished', max_length=200)


class orderDetail(models.Model):
    order = models.ForeignKey(order,
                              on_delete=models.CASCADE,
                              related_name='details')
    perfume = models.ForeignKey(perfume, on_delete=models.CASCADE)
    amount = models.PositiveSmallIntegerField(default=1)
    price = models.IntegerField()