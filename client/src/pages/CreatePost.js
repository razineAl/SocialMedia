import {Formik, Form, Field, ErrorMessage} from  'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const initialValues = {
    title:'',
    postText:'',
  }
  useEffect(()=>{
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  },[])
  const handleSubmit = (data)=>{
    axios.post('http://localhost:3001/posts',data,{headers:{accessToken:localStorage.getItem('accessToken')}}).then((res)=>{
      navigate('/');
    });
  }
  const validationSchema = yup.object().shape({
    title : yup.string().required(),
    postText : yup.string().required(),
  });
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <div>
            <label htmlFor='title'>Title</label>
            <ErrorMessage name='title' component='span' className='error'></ErrorMessage>
            <Field id='title' name='title' placeholder='enter a title (ex: title)'></Field>
          </div>
          <div>
            <label htmlFor='postText'>Post</label>
            <ErrorMessage name='postText' component='span' className='error'></ErrorMessage>
            <Field id='postText' name='postText' placeholder='enter the postText (ex: postText)'></Field>
          </div>

          
        <button type='submit' id='create-post'>Create Post</button> 
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;