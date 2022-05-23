
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from "./Table"
import {useState} from 'react'
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

function createData(name, status) {
    return { name, status };
}


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
}

export default function Main() {
    const [data, setData] = useState([
      createData("Task 1", "Complete"),
      createData("Task 2", "Complete"),
      createData("Task 3", "Complete"),
      createData("Task 4", "Complete"),
    ]);


    const change = (index, event) => {
        console.log(`${index} - ${event.target.checked}`)
        const newData = [...data]
        const statusIncomplete = "Incomplete"
        const statusComplete = "Complete"

        if (!event.target.checked)
            newData[index].status = statusIncomplete
        else
            newData[index].status = statusComplete

        setData(newData)
    }

    return (
        <div>
            <Navbar/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <CssBaseline />
              <Container component="main">
                <Typography variant="h3" gutterBottom>
                  SPA para SSBW
                </Typography>
                <Table data={data} onChange={change}/>
              </Container>
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: 'auto',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[800],
                }}
              >
                <Container maxWidth="sm">
                  <Copyright />
                </Container>
              </Box>
            </Box>
        </div>
    );
}