# Generated by Django 3.2 on 2021-05-24 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0015_rename_perfume_rated_rate_perfume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='content',
            field=models.TextField(default=''),
        ),
    ]