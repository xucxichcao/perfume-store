# Generated by Django 3.2 on 2021-05-19 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0007_perfume_sname'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfume',
            name='basenote',
            field=models.CharField(max_length=400, null=True),
        ),
        migrations.AddField(
            model_name='perfume',
            name='midnote',
            field=models.CharField(max_length=400, null=True),
        ),
        migrations.AddField(
            model_name='perfume',
            name='topnote',
            field=models.CharField(max_length=400, null=True),
        ),
    ]