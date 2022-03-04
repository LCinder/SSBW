
from mongoengine import connect, Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, ListField, IntField, DateTimeField, EmailField, GeoPointField, LongField, URLField, EnumField, FloatField

connect("data", host="mongo")


class Address(EmbeddedDocument):
    street = StringField(max_length = 50)
    streetName = StringField(max_length = 50)
    buildingNumber = IntField()
    city = StringField(max_length = 50)
    zipCode = StringField(max_length = 50)
    country = StringField(max_length = 50)
    countryCode = StringField(max_length = 10)
    location = GeoPointField()

class Gender():
    MALE = "male"
    FEMALE = "female"


class Persons(Document):
    firstname = StringField(max_length = 50)
    lastname = StringField(max_length = 50)
    email = EmailField(required = True)
    phone = LongField()
    birthday = DateTimeField()
    #gender = EnumField(Gender, choices=[Gender.MALE, Gender.FEMALE])
    address = EmbeddedDocumentField(Address)
    website = URLField()
    image = StringField()
