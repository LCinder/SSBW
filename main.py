
from model import Persons, Address


address = Address(street="Pedro Antonio", location=(37.17, -3.6))
person = Persons(firstname="FirstName", lastname="LastName", email="email@email.com", address=address)
person.save()