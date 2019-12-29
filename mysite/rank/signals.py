from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomUser
from .models import createdRankings, film


@receiver(post_save, sender=CustomUser)
def rank_default_save(sender, instance, created, **kwargs):
    createdRankings.objects.create(title='example', author=instance)
    
