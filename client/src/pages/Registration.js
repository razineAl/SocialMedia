import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from  'formik';
import * as yup from 'yup';

function Registration() {
    const validationSchema = yup.object().shape({
        username : yup.string().min(3).max(15).required(),
        password : yup.string().min(4).max(20).required()
      });
    const initialValues = {
      username:'',
      password:''
    }
    const handleSubmit = async (data)=>{
        const response = await axios.post('http://localhost:3001/auth',data);
    }
    return(
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              <Form>               
                <div>
                  <label htmlFor='username'>Username</label>
                  <ErrorMessage name='username' component='span' className='error'></ErrorMessage>
                  <Field id='username' name='username' placeholder="what's your username (ex: username)"></Field>
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <ErrorMessage name='password' component='span' className='error'></ErrorMessage>
                  <Field id='password' name='password' placeholder="what's your password (ex: password)" type='password'></Field>
                </div>
                <button type='submit' id='create-post'>Register</button>
              </Form>
            </Formik>
        </div>
    )
}

export default Registration;