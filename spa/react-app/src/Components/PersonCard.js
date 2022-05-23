
import React from "react"
import {useState, useEffect} from "react"
import Navbar from "./Navbar";
import Table from "./Table";
import TablePersons from "./TablePersons";
import {useParams} from "react-router-dom";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function PersonCard(props) {

    const person = props.data;
    const URL_IMAGE = `http://localhost/app/api/person/${person.id}/image`;

    return (
        <div>
            <Navbar/>
            <Box style={{justifyContent: "center", display: "flex", marginTop: "5%"}} alignItems="center">
                <Card>
                  <CardMedia
                    component="img"
                    height="500"
                    image={URL_IMAGE}
                    alt="person image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {person.firstname} {person.lastname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Email: {person.email}
                    </Typography>
                  </CardContent>
                </Card>
            </Box>
        </div>
    );

}