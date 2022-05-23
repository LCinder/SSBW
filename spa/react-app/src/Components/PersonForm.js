import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from "./Navbar";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Navigate, useNavigate, useParams} from "react-router-dom";

export default function PersonForm(props) {

    const person = props.data;
    const type = props.type;
    const navigate = useNavigate();
    const URL_POST = `http://localhost/app/api/person`;

    let initialPerson = {}

    if (type === "put")
        initialPerson = {
            firstname: person.firstname,
            lastname: person.lastname,
            email: person.email,
        }
    else
        initialPerson = {
            firstname: "",
            lastname: "",
            email: "",
        }

    const [newPerson, setNewPerson] = useState(initialPerson)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewPerson({ ...newPerson, [name]: value });
        console.log(newPerson);
    };

    function putData() {
        console.log(newPerson)
        const URL_PUT = `http://localhost/app/api/person/${person.id}`;

        fetch(URL_PUT, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newPerson)
        })
        .then((response) => {
            response.json()
        })
        .catch((error) => console.log(error))
    }


    function postData() {
        console.log(newPerson)
        fetch(URL_POST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newPerson),
            redirect: "follow"
        })
        .then((response) => {
            response.json()
        })
        .catch((error) => console.log(error))
    }

    function submit() {
        if (type === "put")
            putData();
        else
            postData();
        navigate("/persons")
    }

    return (
        <div>
            <Navbar/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: "block" }}>
                <form onSubmit={putData} style={{margin: "3%"}}>
                    <TextField
                      label="Firstname"
                      name="firstname"
                      sx={{ m: 1, width: '25ch' }}
                      value={newPerson.firstname}
                      onChange={handleInputChange}
                    />

                    <TextField
                      label="Lastname"
                      name="lastname"
                      sx={{ m: 1, width: '25ch' }}
                      defaultValue={newPerson.lastname}
                      value={newPerson.lastname}
                      onChange={handleInputChange}
                    />

                    <TextField
                      label="Email"
                      name="email"
                      sx={{ m: 1, width: '25ch' }}
                      defaultValue={newPerson.email}
                      value={newPerson.email}
                      onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={submit} style={{justifyContent: "center", display: "flex", background: "#ef5350"}} alignItems="center">Edit</Button>
                </form>
          </Box>
        </div>
    );
}
