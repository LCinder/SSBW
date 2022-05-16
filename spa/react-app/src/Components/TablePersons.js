import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {useState} from "react";



export default function TablePersons(props) {
  const data = props.data;
  const [persons, setPerson] = useState(data)

  function deletePerson(id) {
    fetch(`http://localhost:8000/api/person/${id}`, {method: "DELETE"})
    .then(() => {
      const newPersons = persons.filter(person => person.id !== id);
      setPerson(newPersons)
      return (
          <TablePersons data={newPersons}/>
      )
    })
    .catch((error) => console.log(error))
  }

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell align="right">Lastname</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Profile</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.firstname}
                >
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="right">{row.lastname}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right"><Button variant="outlined" color={"success"} href={`/persons/${row.id}`}>Go to Profile</Button></TableCell>
                  <TableCell align="right">
                    <Button variant="contained" variant="outlined" href={`/persons/${row.id}/edit`} style={{marginRight: "20px"}}>Edit</Button>
                    <Button variant="contained" variant="outlined" color={"error"} onClick={() => deletePerson(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" href={`/persons/add`}>Add Person</Button>
    </div>
  );
}