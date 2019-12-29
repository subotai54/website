from django.views import generic
from .models import Project
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.urls import reverse

class ProjectList(generic.ListView):
    queryset = Project.objects.filter(status=1).order_by('-created_on')
    template_name = 'projects/index.html'
    paginate_by = 3

def project_detail(request, slug):
    template_name = 'projects/project_base.html'

    return render(request, template_name)