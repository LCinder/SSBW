from django.shortcuts import render, redirect
from . import models
import re


# Create your views here.
from .models import Person


def home(request):
    person_name_query = request.GET.get("q")
    print(person_name_query)
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
            firstname = form.cleaned_data["firstname"]
            lastname = form.cleaned_data["lastname"]
            email = form.cleaned_data["email"]
            image = Person.objects[0].image

            person = Person(firstname=firstname, lastname=lastname, email=email, image=image)
            person.save()
            return redirect("/")

    objects = {
        "form": form
    }
    return render(request, "add.html", objects)


def detail(request, id):
    objects = {
        "id": id
    }
    return render(request, "index.html", objects)


def edit(request, email):
    if request.method == "GET":
        form = models.PersonForm()

    if request.method == "POST":
        person = Person.objects(email=email)
        form = models.PersonForm(data=request.POST, instance=person)

        if form.is_valid():
            firstname = form.cleaned_data["firstname"]
            lastname = form.cleaned_data["lastname"]
            email2change = form.cleaned_data["email"]

            person.firstname = firstname
            person.lastname = lastname
            person.email = email2change
            person.save()

            return redirect("/")

    objects = {
        "form": form
    }
    return render(request, "edit.html", objects)


def delete(request, email):
    person = Person.objects(email=email)
    person.delete()

    objects = {
    }
    return redirect("/")
