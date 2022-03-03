
from mongoengine import connect, Document, EmbeddedDocument


class Persons(Document):
    id = IntField(required = True)
    firstname = StringField(max_length = 50)
    lastname = StringField(max_length = 50)
    email = EmailField(required = True)
    phone = LongField()
    birthday = DateTimeField()
    gender = EnumField(Gender)
    address = EmbeddedDocumentField(Address)
    website = URLField()
    image = StringField()


class Address(EmbeddedDocument):
    street = StringField(max_length = 50)
    streetName = StringField(max_length = 50)
    buildingNumber = IntField()
    city = StringField(max_length = 50)
    zipCode = StringField(max_length = 50)
    country = StringField(max_length = 50)
    countryCode = StringField(max_length = 10)
    latitude = FloatField()
    longitude = FloatField()


class Gender(Enum):
    MALE = "male"
    FEMALE = "female"