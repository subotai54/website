from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.apps import apps
CustomUser = apps.get_model('users', 'CustomUser')

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('username', 'email')


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')