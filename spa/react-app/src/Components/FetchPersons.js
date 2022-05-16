
import React from "react"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import Navbar from "./Navbar";


export default function FetchDog() {
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(null)

    function loading() {

            if (isLoading)
                return (
                    <h4>Loading...</h4>
                )
            else
                return (
                    <div>
                        <img src={imageUrl} alt=""/>
                    </div>
                )
    }
    useEffect(() => {
        fetch("localhost:8000/api/person")
            .then((response) => {
                return response.json()
            })
            .then((dog) => {
                setImageUrl(dog.message)
                setIsLoading(false)
            })
    }, [])




    return (
        <div>
            <Navbar/>
            {loading()}
        </div>
    )



}