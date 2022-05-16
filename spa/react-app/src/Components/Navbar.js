import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white"}}>
              <Button color="inherit">Home</Button>
            </Link>
            <Button color="inherit" style={{ textDecoration: "none", color: "white"}}>
              <Link to="/persons" style={{ textDecoration: "none", color: "white"}}>Persons</Link>
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
