# Generated by Django 3.2 on 2021-05-24 01:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0013_alter_perfume_sex'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rate',
            old_name='perfume',
            new_name='perfume_rated',
        ),
    ]
