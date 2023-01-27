import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {useFormik} from "formik";
import * as yup from "yup";

import { InputAdornment } from '@mui/material';
import {IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
// import { InputAdornment, IconButton } from "@material-ui/core";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

export function Login(){

    const [output,setOutput] = useState("");
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const formValidationSchema = yup.object ({
      mail :yup
       .string()
       .min(5, "Need a bigger email")
       .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9*-]+\.[A-Z]{2,}$/i,
          "Pattern not matched")
      .required ("Why not fill this email ?"),
       password : yup
       .string()
       .required("Why not fill this password ?"),
  });

  const {handleSubmit , values , handleChange , handleBlur , errors , touched} =
   useFormik ({
      initialValues : {mail : "",password : "",output : ""},
      validationSchema : formValidationSchema,
      onSubmit : (loginData)=> {
          login(loginData)
      }
   })

    const login = (loginData) => {

        axios({
            method: 'POST',
            url: 'https://bulk-email-tool.onrender.com/login',
            data: {
              mail: loginData.mail,
              password: loginData.password
            }
          })
          .then(function(res){
            const ans = res.status;
            // console.log(res.headers)
            if(ans === 200)
              {
                const output = <div className='error' style={{color:"green"}}>Welcome boss ..!! Successfully Login...✔️</div>
                setOutput(output)
                localStorage.setItem("token", res.data.token);
                setTimeout(timeout,2000)
              }
            })
          .catch((err)=>{
              const text = err.response.status;
              if(text === 401){
                alert("Invalid Credential")
              }});

          function timeout(){
             history.push("/");
          }
        };

return (

<form onSubmit={handleSubmit}  className='login-container'>
    <div className='text-login'>Login</div>
    <div className='login-input'>
      <TextField id="outlined-basic" 
       aria-invalid="false"
       color="primary" 
       size='small' label="Enter a user mail id" 
       variant="outlined" value={values.mail} 
       name='mail'
       onChange={handleChange}
       onBlur={handleBlur}
       error={errors.mail && touched.mail}
       helperText= {errors.mail && touched.mail ? errors.mail : ""}
       placeholder="Enter a user mail id" />

      <TextField id="outlined-basic1" 
       autoComplete="on"
       aria-invalid="false"
       color="primary" size='small' 
       label="Enter a user password" 
       variant="outlined" value={values.password} 
       name="password"
       onChange={handleChange}
       onBlur={handleBlur}
       error={errors.password && touched.password}
       helperText={errors.password && touched.password ? errors.password : ""}
       placeholder="Enter a user password" 
       type={showPassword ? "text" : "password"} // <-- This is where the magic happens
       InputProps={{ // <-- This is where the toggle button is added.
         endAdornment: (
           <InputAdornment position="end">
             <IconButton
               aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword}
             >
               {showPassword ? <Visibility /> : <VisibilityOff />}
               </IconButton>
      </InputAdornment>
    )
  }}/>
       <div>{output}</div>
    </div>
    <div className='login-button'>
        <Button className='_button' variant="contained" color='primary' onClick={()=>history.push('/signup')}> Sign up </Button>
        <Button className='_button' variant="contained" color='success' type='submit'> Log in </Button>
    </div>
</form>
)
}
