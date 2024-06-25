import './App.css';
import {BrowserRouter as Router, Routes , Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import pageNotFound from './pages/pageNotFound';
import { AuthContext } from './helpers/AuthContext';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Profile from './pages/Profile';


function App() {
  const [authState,setAuthState] = useState({username:'',id:'',status:false});


  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get('http://localhost:3001/auth/auth',{headers:{accessToken:localStorage.getItem('accessToken')}});
      if (response.data.error) {
        setAuthState({...authState,status:false});
      } else {
        setAuthState({username:response.data.username,id:response.data.id,status:true});
      }
    }
    fetchData();
  },[])
  const handleLogOut = ()=>{
    localStorage.removeItem('accessToken');
    setAuthState({username:'',id:'',status:false});

  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
          <div id='navbar'>
            
            {
              !authState.status ?
              ( 
              <>
                <Link to='/registration' className='Liens'>Registration</Link>
                <Link to='/login' className='Liens'>Login</Link>
              </>
              ) :
              (

                <>
                  <Link to='/' className='Liens'>Go home</Link>
                  <Link to='/createpost' className='Liens'>Create post</Link>
                  <h1>{authState.username}</h1>
                  <Link to='/registration' id='logout' onClick={handleLogOut}>Logout</Link>                  
                </>
                
              )
            }
            
          </div>
          
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/createpost' exact Component={CreatePost} />
            <Route path='/post/byId/:id' exact Component={Post} />
            <Route path='/registration' exact Component={Registration} />
            <Route path='/login' exact Component={Login} />
            <Route path='/profile/:id' exact Component={Profile} />
            <Route path='*' exact Component={pageNotFound} />

          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
