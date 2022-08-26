import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import {useFormik} from "formik";
import * as yup from "yup";
// import { height } from '@mui/system';

export function SendMail() {

  const history = useHistory();
  
  const formValidationSchema = yup.object ({
    fullName :yup
      .string()
      .required ("Why not fill this fullname ?"),
    email :yup
      .string()
      .min(5, "Need a bigger email")
      .matches(
         /^[A-Z0-9._%+-]+@[A-Z0-9*-]+\.[A-Z]{2,}$/i,
         "Pattern not matched")
      .required ("Why not fill this sender email ?"),
    to :yup
      .string()
      .min(5, "Need a bigger email")
      .matches(
         /^[A-Z0-9._%+-]+@[A-Z0-9*-]+\.[A-Z]{2,}$/i,
         "Pattern not matched")
      .required ("Why not fill this to email ?"),
    message : yup
     .string()
     .required("Why not fill this message ?"),
    subject :yup
     .string()
     .required ("Why not fill this subject"),
    url : yup
     .string()
     .required ("Why not fill this url ?"),
});

const {handleSubmit , values , handleChange , handleBlur , errors , touched} =
 useFormik ({
    initialValues : {fullName : "",to : "",message :"",bcc : "",url : "",email : "",subject : ""},
    validationSchema : formValidationSchema,
    onSubmit : (mailData)=> {
        Send_mail(mailData)
    }
 })

  const Log_out = () => {
    localStorage.removeItem("token");
    setTimeout( logout,1500)
  };
  function logout(){
    history.push("/login");
    return
  }

  const Send_mail = (mailData) => {

  axios ({
    method : 'post',
    url : 'https://bulk-emailapp.herokuapp.com/send',
    data: {
      fullName: mailData.fullName,
      email: mailData.email,
      to: mailData.to,
      message: mailData.message,
      bcc: mailData.bcc,
      url: mailData.url,
      subject: mailData.subject
    },
    headers: {
      "x-auth-token": localStorage.getItem("token")
    }

  })
  .then((res)=>{
     const text = res.statusText;
     if(text === "Unauthorized")
     {
      alert("please login and try again latter")
      setTimeout( later,1000)
      return
    }
     if(text === "OK"){
      alert("Mail send successfully")
      window.location.reload()
      return
     }})
  .catch((err)=>{console.log(err);
    const text = err.response.statusText;
    if(text === "Unauthorized")
     {
      alert("please login and try again latter")
      setTimeout( later,1000)
      return
    }
    alert(err.message);
    return
    }
    )
    function later(){
      history.push("/login")
      return
    } 

  };
  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className='input_fields'>
       
          <TextField className="outlined-basic" 
           color="primary" 
           size='small' label="Enter a full name" 
           variant="outlined" value={values.fullName} 
           name='fullName'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.fullName && touched.fullName}
           helperText= {errors.fullName && touched.fullName ? errors.fullName : ""}
           placeholder="Enter a full name" />
       
          <TextField className="outlined-basic" 
           color="primary" size='small' 
           label="Enter a sender email" 
           variant="outlined" value={values.email} 
           name='email'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.email && touched.email}
           helperText= {errors.email && touched.email ? errors.email : ""}
           placeholder="Enter a mail" />

          <TextField className="outlined-basic" 
           color="primary" size='small' 
           label="Subject" variant="outlined" value={values.subject}
           name='subject'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.subject && touched.subject}
           helperText= {errors.subject && touched.subject ? errors.subject : ""} 
           placeholder="Enter a subject" />

          <TextField className="outlined-basic" 
           color="primary" size='small' 
           label="Enter a to email" variant="outlined" value={values.to} 
           name='to'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.to && touched.to}
           helperText= {errors.to && touched.to ? errors.to : ""}
           placeholder="Enter a to mail" />

          <TextField className="outlined-basic" 
           id="big"
           color="primary" size='small' 
           label="Enter a bcc" variant="outlined" value={values.bcc} 
           name='bcc'
           multiline
           rows='5'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.bcc && touched.bcc}
           helperText= {errors.bcc && touched.bcc ? errors.bcc : ""}
           placeholder="Enter bcc with comma seperated  eg:abc@gmail.com,xyz@gmail.com" />

          <TextField className="outlined-basic" 
           id="big"
           color="primary" size='small' 
           label="Enter a message" variant="outlined" value={values.message} 
           name='message'
           multiline
           rows='5'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.message && touched.message}
           helperText= {errors.message && touched.message ? errors.message : ""}
           placeholder="Enter a message" />
   
          <TextField className="outlined-basic" 
           color="primary" size='small' 
           label="Enter a valid picture Url" variant="outlined" value={values.url} 
           name='url'
           onChange={handleChange}
           onBlur={handleBlur}
           error={errors.url && touched.url}
           helperText= {errors.url && touched.url ? errors.url : ""}
           placeholder="eg : https://www.picture.jpg" />
      </div>
      <div className='logout-button'>
        <Button className='_button1' variant="contained" type='submit' endIcon={<SendIcon/>}> Send </Button>
        <Button className='_button1' variant="contained" color='error' onClick={Log_out}> Log out </Button>
      </div>

    </form>
  );
}