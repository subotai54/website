# Generated by Django 2.2.7 on 2019-12-20 21:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name': 'member', 'verbose_name_plural': 'members'},
        ),
    ]
