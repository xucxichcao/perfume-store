# Generated by Django 3.2 on 2021-05-23 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0012_perfume_sex'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfume',
            name='sex',
            field=models.CharField(choices=[('Nam', 'Nam'), ('Nữ', 'Nữ'), ('Unisex', 'Unisex')], default='unisex', max_length=6),
        ),
    ]