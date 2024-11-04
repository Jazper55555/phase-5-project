import React, { useContext } from "react";
import {useState} from "react";
import {useFormik} from "formik"
import * as Yup from 'yup'
import ImageLogo from '../assets/ICA-LOGO.PNG'
import { UserContext } from "./UserContext";

function Login() {
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('');
    const {setUser} = useContext(UserContext)
  
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format - must include @'),
        password: Yup.string()
            .required('Password is required')
      });
  
      const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
          fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              resetForm()
              setMessage('Log in successful!');
              const userData = {id: data.user_id, email: values.email, password: values.password}
              setUser(userData)
              localStorage.setItem('user', JSON.stringify(userData))
              setErrors([]);
            } else {
              setErrors(data.errors || ['Login failed']);
              setMessage('');
            }
          })
          .catch(() => setErrors(['Network error - Try again later']));
        }
      })

    return (
        <div className="signin-container">
            <br></br>
          <h2 className="signin-text">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <br></br>
            <br></br>
            <div className="form-field">
              <label htmlFor='email'>Email</label>
              <input
                type="email"
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? <p className='error-text' style={{ color: 'black' }}>{formik.errors.email}</p> : null}
            </div>
            <br></br>
            <div className="form-field">
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? <p className='error-text' style={{ color: 'black' }}>{formik.errors.password}</p> : null}
            </div>
            <br></br>
            <button type='submit' className="signin-button">Login</button>
            <br></br>
            <br></br>
            {errors.length > 0 && errors.map((err, index) => (
              <p key={index} style={{color: 'black'}} className="login-error-text">{err}</p>
            ))}
            {message && <p style={{color: 'white'}}>{message}</p>}
          </form>
          <div className="signin-image" style={{backgroundImage: `url(${ImageLogo})`}}></div>
        </div>
      );
}

export default Login