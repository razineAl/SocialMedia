import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';


function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();
    const checkEntry = (e)=>{
        if (e.key === "Enter"){
            handleClick();
        }
    }
    const handleClick = async ()=>{
        
        const response = await axios.post('http://localhost:3001/auth/login', {username:username,password:password});
        if(response.data.error){
         alert(response.data);
        } else{
            localStorage.setItem('accessToken',response.data.token);
            setAuthState({username:response.data.username,id:response.data.id,status:true});
            navigate('/');
        }
        
    }
    return(
        <div id='LoginSection'>
            <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={checkEntry}></input>
            <button type='button' onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;