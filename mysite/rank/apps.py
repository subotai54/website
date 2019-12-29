from django.apps import AppConfig
from django.db.models.signals import post_save
from .signals import rank_default_save

class RankConfig(AppConfig):
    name = 'rank'

    def ready(self):
       myccl = self.get_model('createdRankings')
       post_save.connect(rank_default_save, sender=myccl, dispatch_uid="D01")