from django.shortcuts import render
from . import models
import re
from web import settings

# Create your views here.
from .models import Person


def home(request):
    person_name_query = request.GET.get("q")
    person_name = re.compile("^{}".format(person_name_query), re.IGNORECASE)
    persons = ""

    try:
        if person_name:
            persons = models.Person.objects.filter(firstname=person_name)
    except Person.DoesNotExist:
        persons = ""

    objects = {
        "persons": persons
    }
    return render(request, "index.html", objects)
