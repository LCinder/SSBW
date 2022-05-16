"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from app import views

# /.../
urlpatterns = [
    path("", views.home, name="index"),
    path("add", views.add, name="add"),
    path("detail/<id>", views.detail, name="detail"),
    path("edit/<id>", views.edit, name="edit"),
    path("delete/<id>", views.delete, name="delete"),
    path("persons/", views.load_data, name="persons"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("auth/", include("rest_framework.urls")),
    path("api/person", views.person_list),
    path("api/person/<id>", views.person_detail),
    path("api/person/<id>/image", views.person_image),
    path("api/load", views.load_data),
]
