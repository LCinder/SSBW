from mongoengine import connect, Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, IntField, DateTimeField, EmailField, GeoPointField, \
    LongField, URLField, EnumField
from enum import Enum
from django import forms
import logging

logger = logging.getLogger(__name__)

try:
    connect("data", host="mongo")
except ConnectionError as error:
    logger.error("Error connecting: {}".format(error))


class Address(EmbeddedDocument):
    street = StringField(max_length=50)
    street_name = StringField(max_length=50)
    building_number = IntField()
    city = StringField(max_length=50)
    zip_code = StringField(max_length=50)
    country = StringField(max_length=50)
    country_code = StringField(max_length=10)
    location = GeoPointField()

    def __str__(self):
        return self.city + ", " + self.country + " (" + self.country_code + ")"


class Gender(Enum):
    MALE = "male"
    FEMALE = "female"


class Person(Document):
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)
    email = EmailField(required=True)
    phone = LongField()
    birthday = DateTimeField()
    gender = EnumField(Gender)
    address = EmbeddedDocumentField(Address)
    website = URLField()
    image = StringField()

    def __str__(self):
        return self.firstname + " " + self.lastname + " Address: " + str(self.address)


class PersonForm(forms.Form):
    firstname = forms.CharField()
    lastname = forms.CharField()
    email = forms.EmailField(required=True)
    image = forms.FileField(widget=forms.FileInput(), required=False)
    # phone = forms.NumberInput()
    # birthday = forms.DateTimeField()
    # gender = EnumField(Gender)
    # address = EmbeddedDocumentField(Address)
    # website = forms.URLField()
