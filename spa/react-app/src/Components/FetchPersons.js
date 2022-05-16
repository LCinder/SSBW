
import React from "react"
import {useState, useEffect} from "react"
import Navbar from "./Navbar";
import Table from "./Table";
import TablePersons from "./TablePersons";


export default function FetchPersons() {
    const [isLoading, setIsLoading] = useState(true)
    const [persons, setPerson] = useState(null)

    function loading() {
        if (isLoading)
            return (
                <h4>Loading...</h4>
            )
        else
            return (
                <TablePersons data={persons}/>
            )
    }

    useEffect(() => {
        fetch("http://localhost:8000/api/person")
        .then((response) => response.json())
        .then(persons => {
            console.log(persons)
            setPerson(persons)
            setIsLoading(false)
        })
        .catch((error) => console.log(error))
    }, [])


    return (
        <div>
            <Navbar/>
            {loading()}
        </div>
    )

}