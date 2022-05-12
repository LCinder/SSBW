
import React from "react"
import {useState, useEffect} from "react"

export default function FetchDog() {
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => {
                response.json()
            })
            .then((dog) => {
                setImageUrl(dog.message)
                setIsLoading(false)
            })
    }, [])

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