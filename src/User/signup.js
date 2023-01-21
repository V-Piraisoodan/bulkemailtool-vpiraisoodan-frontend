import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import {useFormik} from "formik";
import * as yup from "yup";

export function Signup(){

    const [ output,setOutput] = useState("");
    const history = useHistory();

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
         .min(8, "Need a longer password")
         .max(12, "Too much password")
         .required("Why not fill this password ?"),
    });

    const {handleSubmit , values , handleChange , handleBlur , errors , touched} =
     useFormik ({
        initialValues : {mail : "",password : "",output : ""},
        validationSchema : formValidationSchema,
        onSubmit : (signupData)=> {
            console.log("onSubmit",signupData)
            signup(signupData)
        }
     })


    const signup = (signupData) => {
        fetch("https://bulk-email-tool.onrender.com/signup",
        {
          method : "POST",
          body : JSON.stringify(signupData),
          headers : {"Content-type" : "application/json"}
        })
        .then((ans)=>{
            let res = ans
            if(res.statusText === "Bad Request"){
                console.log(res.statusText)
                const output = <div style={{color:"red"}}>User account already exists... ❌ Please Login</div>
                setOutput(output)
                setTimeout(delay,3000)
                return
            }
            else{
                const output = <div style={{color:"green"}}>Thanks !! your account has been successfully created...✔️</div>
                setOutput(output)
                setTimeout(delay,2500)
            }
        })
        .catch((err)=>{
            setOutput(`Unable to connect to the Internet , ${err.message}`)
            console.log(err.message)
        })
        };
        function delay(){
           history.push('/login')
       }

return (

<form onSubmit={handleSubmit}  className='login-container'>
    <div className='text-login'>Signup</div>
    <div className='login-input'>
      <TextField id="outlined-basic" 
       color="primary" 
       size='small' label="Enter a mail id" 
       variant="outlined" value={values.mail} 
       name="mail"
       onChange={handleChange}
       onBlur={handleBlur}
       error={errors.mail && touched.mail}
       helperText= {errors.mail && touched.mail ? errors.mail : ""}
       placeholder="Enter a mail id" />

      <TextField id="outlined-basic" 
       color="primary" size='small' 
       label="Enter a password" 
       variant="outlined" value={values.password}
       name="password"
       onChange={handleChange}
       onBlur={handleBlur}
       error={errors.password && touched.password}
       helperText={errors.password && touched.password ? errors.password : ""}
       placeholder="Enter a password" />
       
       <div className='error'>{output}</div>
    </div>
    <div className='signup-button'>
        <Button className='_button' variant="contained" color='success' type='submit'> Sign up </Button>
    </div>
</form>
)
}