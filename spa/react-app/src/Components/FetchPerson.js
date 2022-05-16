
import React from "react"
import {useState, useEffect} from "react"
import PersonCard from "./PersonCard";
import PersonForm from "./PersonForm";
import {useParams} from "react-router-dom";


export default function FetchPerson(props) {
    const params = useParams();
    const personId = params.personId;
    const type = props.type;

    const [isLoading, setIsLoading] = useState(true)
    const [person, setPerson] = useState(null)

    function loading() {
        if (isLoading)
            return (
                <h4>Loading...</h4>
            )
        else
            if (type === "get")
                return (
                    <PersonCard data={person}/>
                )
            else
                return (
                    <PersonForm data={person} type={type}/>
                )
    }

    useEffect(() => {
        if (type === "put" || type === "get") {
            fetch(`http://localhost:8000/api/person/${personId}`)
            .then((response) => response.json())
            .then(person => {
                setPerson(person)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
        }
        else
            setIsLoading(false)
    }, [])


    return (
        <div>
            {loading()}
        </div>
  );



}