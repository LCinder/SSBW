
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
    console.log(props)

    return (
        <div>
            <Navbar/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: "block" }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
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