
from model import Persons

address = Address(street="Pedro Antonio", location=(37.17, -3.6))
person = Persons(id=1, firstname="FirstName", lastName="LastName", email="email@emailcom", address=address)
person.save()