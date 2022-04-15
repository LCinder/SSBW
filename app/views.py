import json
import os

import requests
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from . import models
import re
import logging
from django.contrib.auth.decorators import login_required
from .models import Person, Address

logger = logging.getLogger(__name__)


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
        "persons": persons,
        "nav_search": person_name_query
    }

    return render(request, "index.html", objects)


@login_required
def add(request):
    form = models.PersonForm()
    user = request.user.email
    admin = "admin@admin.es"

    if request.method == "POST":
        form = models.PersonForm(request.POST, request.FILES)

        if form.is_valid():
            if user == admin:
                firstname = form.cleaned_data["firstname"]
                lastname = form.cleaned_data["lastname"]
                email = form.cleaned_data["email"]
                image = request.FILES
                person = Person(firstname=firstname, lastname=lastname, email=email)
                person.save()

                if image:
                    image_name_2_save = "app/static/data/img/{}.jpg".format(person.id)
                    image_name = "data/img/{}".format(person.id)
                    fs = FileSystemStorage()
                    fs.save(image_name_2_save, image["image"])
                else:
                    image_name = Person.objects[0].image

                person.image = image_name
                person.save()
                logger.info("New person added")

                return redirect("/")
            else:
                return redirect("/")

    objects = {
        "form": form
    }

    return render(request, "add.html", objects)


def detail(request, id):
    person = Person.objects.get(id=id)

    objects = {
        "person": person
    }

    return render(request, "detail.html", objects)


@login_required
def edit(request, id):
    person = Person.objects.get(id=id)

    user = request.user.email
    admin = "admin@admin.es"

    if request.method == "GET":
        form = models.PersonForm()

    if request.method == "POST":
        form = models.PersonForm(data=request.POST)

        if form.is_valid():
            if user == admin:
                firstname = form.cleaned_data["firstname"]
                lastname = form.cleaned_data["lastname"]
                email = form.cleaned_data["email"]

                person.firstname = firstname
                person.lastname = lastname
                person.email = email
                person.save()
                logger.info("The person was edited")

            else:
                return redirect("/")

        else:
            logger.error("Form not valid")

        return redirect("/")

    objects = {
        "form": form,
        "person": person
    }

    return render(request, "edit.html", objects)


@login_required
def delete(request, id):
    user = request.user.email
    admin = "admin@admin.es"

    if user == admin:
        person = Person.objects(id=id)
        person.delete()
        logger.info("The person was deleted")

        objects = {
            "delete": id
        }

        return JsonResponse(objects)

    else:
        return redirect("/")


def login(request):
    return render(request, "login.html", {})


def load_data(request):
    n = 0
    n_persons = 100

    res = requests.get("https://fakerapi.it/api/v1/persons?_quantity={}".format(n_persons))
    data = res.json()

    for element in data["data"]:
        address = Address(street=element["address"]["street"], street_name=element["address"]["streetName"],
        building_number=element["address"]["buildingNumber"], city=element["address"]["city"],
        zip_code=element["address"]["zipcode"], country=element["address"]["country"],
        country_code=element["address"]["county_code"], location=[element["address"]["latitude"], element["address"]["longitude"]])

        person = Person(firstname=element["firstname"], lastname=element["lastname"],
        email=element["email"], phone=element["phone"], birthday=element["birthday"], gender=element["gender"],
        website=element["website"], address=address)

        person.save()

        person_name = str(person.id)
        print(person.id)

        image = requests.get("https://thispersondoesnotexist.com/image")
        if image.status_code == 200:
            with open("data/img/" + person_name, "wb") as f:
                f.write(image.content)
            os.rename("data/img/" + person_name, "data/img/" + person_name + ".jpg")
        n += 1

        person.image = "data/img/" + str(person_name)
        print(element)
        print("\n")

        person.save()


    return redirect("/")