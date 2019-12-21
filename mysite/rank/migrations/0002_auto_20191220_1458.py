# Generated by Django 2.2.7 on 2019-12-20 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rank', '0001_initial'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='film',
            constraint=models.UniqueConstraint(fields=('parentRanking', 'rank'), name='unique_rank'),
        ),
    ]