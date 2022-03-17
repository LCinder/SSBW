from django.shortcuts import render
from . import models
import re


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


def add(request):
    form = models.PersonForm()

    if request.method == "POST":
        form = models.PersonForm(data=request.POST)

        if form.is_valid():
            print(form.cleaned_data)
            firstname = form["firstname"]
            lastname = form["lastname"]
            email = form["email"]

            person = Person(firstname=firstname, lastname=lastname, email=email)
            person.save()

    objects = {
        "form": form
    }
    return render(request, "add.html", objects)


def detail(request, id):
    objects = {
        "id": id
    }
    return render(request, "index.html", objects)


def edit(request, id):
    objects = {
        "id": id
    }
    return render(request, "index.html", objects)

def delete(request, id):
    objects = {
        "id": id
    }
    return render(request, "index.html", objects)
