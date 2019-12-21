from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    pass
    # add additional fields in here

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "member"
        verbose_name_plural = "members"