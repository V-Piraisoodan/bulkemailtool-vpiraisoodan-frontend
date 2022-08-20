import './App.css';
import { useState } from 'react';
import {Switch,Route,} from 'react-router-dom';
import { NotFound } from './NotFound';
import { SendMail } from './mail/Sendmail';
import { Login } from './User/login';
import { Signup } from './User/signup';
import { useHistory } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { ThemeProvider, createTheme } from '@mui/material/styles';  // dark theme import
import Paper from '@mui/material/Paper';  // PAPER Import

import Brightness4Icon from '@mui/icons-material/Brightness4';  // light and dark icon import
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {

  const history = useHistory();

  const [mode,setmode] = useState("light")

  const darkTheme = createTheme({   //STEP:1 dark theme CONTEXT Creating
    palette: {
      mode: mode,
    },
  });

  const paperStyles = {
    borderRadius : "0px",
    minHeight : "100vh"
  }
  
  return (
  <ThemeProvider theme={darkTheme}> 
    <Paper elevation={6} style={paperStyles}>
      <div className="App">

        <AppBar position="static" className='appbar'>
          <Toolbar>
     
            <Button onClick={()=>history.push('/login')}
              size="large" color="inherit" aria-label="login">
              Login
            </Button>

            <Button onClick={()=>history.push('/')}
              size="large" color="inherit" aria-label="Send mail">
              Send Mail
            </Button>

            <div className='app-description'>BULK PICTURE MAIL SENDER</div>

            <Button onClick={()=>  setmode(mode === "dark" ? "light" : "dark")}
              style = {{marginLeft:"auto"}}
              size="large" color="inherit" aria-label="Mode"
              endIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}>
              {mode === "dark" ? "light" : "dark"} Mode
            </Button>
          </Toolbar>
        </AppBar>  

        <Switch>

          <Route exact path='/login'>
            <Login/>
          </Route> 

          <Route exact path='/signup'>
            <Signup/>
          </Route> 

          <Route exact path='/'>
            <SendMail />
          </Route>
        
          {/* 404 page path */}
          <Route path="**">
            <NotFound/>
          </Route> 
        </Switch>

      </div>
    </Paper>
  </ThemeProvider>
  );
}

export default App;