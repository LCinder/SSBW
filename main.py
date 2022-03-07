
from model import Person, Address
import requests, json, os


def load_data():
    n = 0

    if not Person.objects:
        with open("data/persons.json", "r") as f:
            data = json.load(f)

        for element in data["data"]:
            person_name = "person_" + str(n)

            image = requests.get("https://thispersondoesnotexist.com/image")
            if image.status_code == 200:
                with open("data/img/" + person_name, "wb") as f:
                    f.write(image.content)
                os.rename("data/img/" + person_name, "data/img/" + person_name + ".jpg")
            n += 1

            print(element)
            print("\n")

            address = Address(street=element["address"]["street"], street_name=element["address"]["streetName"],
            building_number=element["address"]["buildingNumber"], city=element["address"]["city"],
            zip_code=element["address"]["zipcode"], country=element["address"]["country"],
            country_code=element["address"]["county_code"], location=[element["address"]["latitude"], element["address"]["longitude"]])

            person = Person(firstname=element["firstname"], lastname=element["lastname"],
            email=element["email"], phone=element["phone"], birthday=element["birthday"], gender=element["gender"],
            image="data/img/" + person_name, website=element["website"], address=address)

            person.save()

def get_person_by_name(firstname):
    return Person(firstname=firstname)

load_data()

for person in Person.objects:
    print(person.lastname)